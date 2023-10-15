const express = require('express');
const pool  = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getallrelationship = (req,res)=>{
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token){
        res.json("Sorry No token");
    }
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        const q = "SELECT `followingid` FROM relationships WHERE `followersid` = ?";
        pool.getConnection((err,connection)=>{
            if(err){
                res.json(err);
            }
            connection.query(q,[userInfo.id],(err,data)=>{
                console.log(userInfo.id)
                res.status(200).json(data.map(r=>r.followingid));
            })
        })

    })
        
}



const addfollowing = (req,res)=>{
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


        const q = "INSERT INTO relationships(`followersid`,`followingid`) VALUES(?,?)";
        const values = [userInfo.id,req.body.followingid];

        
        
        pool.getConnection((err,connection)=>{
            if(err){
                res.json("Sorry SOme glitch");
            }
           connection.query(q,values,(err,data)=>{
                if(err){
                    console.log(err);
                }
                res.json(data);

           
           })
        })

    })
}


const deleterelationship = (req,res)=>{
    
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
    
    
            const q = "DELETE FROM relationships WHERE `followingid` = ? AND `followersid` = ?";
            const values = [req.body.followingid, userInfo.id]
            
            
            pool.getConnection((err,connection)=>{
                if(err){
                    res.json("Sorry SOme glitch");
                }
               connection.query(q,values,(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    res.json(data);
    
               
               })
            })
    
        })
    
}
module.exports = {getallrelationship,addfollowing,deleterelationship};