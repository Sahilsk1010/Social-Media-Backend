const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { connection } = require('mongoose');
const getposts = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        console.log("Sorry");
        res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            res.status(403).json("Invalid,sorry cannot retrive");
        }

        const q = `SELECT p.*, u.id AS userid, u.name, u.profilepic FROM posts AS p 
        JOIN new_table AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followingid) WHERE p.userid = ? OR r.followersid = ?
        ORDER BY p.createddate DESC`;
        
        
        pool.getConnection((err,connection)=>{
            if(err){
                res.json("Sorry SOme glitch");
            }
           connection.query(q,[userInfo.id,userInfo.id,userInfo.id],(err,data)=>{
                if(err){
                    console.log(err);
                }
                res.json(data);

           
           })
        })

    })
}



const addposts = (req,res)=>{

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

        

        const q = "INSERT INTO posts(`desc`, `img`, `createddate`, `userid`) VALUES (?, ?, ?, ?)";
 

        pool.getConnection((err,connection)=>{
            if(err){
                res.json("Sorry Some Glitch");
            }
            const values = [req.body.desc,req.body.img,moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"),userInfo.id];
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



const deleteposts = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        res.status(401).json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            res.status(403).json("Sorry");
        }

        const q = "DELETE FROM posts WHERE `id` = ? AND `userid` = ?"
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
                        res.json("Posts deleted");
                    }
                })
            }
        })
    })

}



module.exports = {getposts,addposts,deleteposts}