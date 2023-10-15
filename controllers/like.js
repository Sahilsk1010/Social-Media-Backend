const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');


const getlikes = (req,res)=>{
    const q = "SELECT userid FROM likes WHERE postid = ?";
    pool.getConnection((err,connection)=>{
        if(err){
            console.log(err);
            res.json("Some error sorry");
        }

        connection.query(q,[req.query.postid],(err,data)=>{
            if(err){
                console.log(err);
                res.json("Sorry some glitch")

            }
            else{
                res.status(200).json(data.map(like=>like.userid))
            }
        })
    })
}

const addlike = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        
        res.json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            res.status(401).json("Sorry Some glitch");
        }
        else{
            const q = "INSERT INTO likes(`userid`,`postid`) VALUES (?, ?)";
            const values = [userInfo.id,req.body.postid];
            pool.getConnection((err,connection)=>{
                if(err){
                    res.status(403).json("Sorry Some glitch");
                }
                connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.json("Sorry SOme glitch");
                    }
                    else{
                        res.status(200).json("Your post has been liked");
                    }
                })
            })
        }

    })
}


const dislike = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        
        res.json("Not logged in");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err){
            console.log(err);
            res.status(401).json("Sorry Some glitch");
        }
        else{
            const q = "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?";
            const values = [userInfo.id,req.body.postid];
            pool.getConnection((err,connection)=>{
                if(err){
                    res.status(403).json("Sorry Some glitch");
                }
                connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.json("Sorry SOme glitch");
                    }
                    else{
                        res.status(200).json("Your post has been disliked");
                    }
                })
            })
        }

    })
}

module.exports = {getlikes,addlike,dislike}