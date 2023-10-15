const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getcomments = (req,res)=>{
    
    const q = `SELECT c.*, u.id AS userid, u.name, u.profilepic FROM comments AS c JOIN new_table AS u ON (u.id = c.userid)
    WHERE c.postid = ? 
    ORDER BY c.createdat DESC`;

    pool.getConnection((err,connection)=>{
        if(err){
            res.json("Sorry some glitch");
        }

        connection.query(q,[req.query.postid],(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json(data);
            }
        })
    })
}


const addcomment = (req,res)=>{

    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        console.log("Sorry");
        res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            res.status(403).json("Sorry");


        }

        

        const q = "INSERT INTO comments(`desc`,  `createdat`, `userid`,`postid`) VALUES (?, ?, ?, ?)";
 

        pool.getConnection((err,connection)=>{
            if(err){
                res.json("Sorry Some Glitch");
            }
            const values = [req.body.desc,moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"),userInfo.id,req.body.postid];
            connection.query(q,values,(err,data)=>{
                if(err){
                    res.json(err);
                }
                else{
                    res.status(200).json("Post is Created")
                }
            })
        })
    })

}

const deletecomm = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            res.status(403).json("Sorry");
        }

        

        const q = "DELETE FROM comments WHERE `id` = ? AND `userid` = ?  "
        pool.getConnection((err,connection)=>{
            if(err){
                res.json("Sorry Some glitch");

            }

            
            else{
                const values = [req.params.id,userInfo.id];
                connection.query(q,values,(err,data)=>{
                    if(err){
                        res.json("Sorry some Glitch");
                    }
                    else{
                        res.json("Comment deleted");
                    }
                })
            }
        })
    })

}


module.exports = {getcomments,addcomment,deletecomm};