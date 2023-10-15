const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const pool = require('../connect.js');
const jwt = require('jsonwebtoken');


let h;

const register = (req, res) => {
    const q = "SELECT * FROM new_table WHERE username = ?";
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      const value = [req.body.username];
      connection.query(q, value, (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        if (data.length > 0) {
          return res.status(409).json("User already exists");
        }
  
        bcrypt.genSalt(10, (salterr, salt) => {
          if (salterr) {
            return res.status(500).json(salterr);
          }
  
          bcrypt.hash(req.body.password, salt, (hasherr, hashedPassword) => {
            if (hasherr) {
              return res.status(500).json(hasherr);
            } else {
                h = hashedPassword
                console.log(hashedPassword);
  
              const q1 = "INSERT INTO new_table (`username`, `email`, `password`, `name`) VALUES (?, ?, ?, ?)";
              const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
  
              connection.query(q1, values, (insertErr, data) => {
                if (insertErr) {
                  res.status(500).json(insertErr);
                } else {
               
                  res.status(200).json(data);
                }
              });
            }
          });
        });
      });
    });
  };
  





const login = (req, res) => {
    const q = "SELECT * FROM new_table WHERE `username` = ?";
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  
      const value = [req.body.username];
      connection.query(q, value, (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        if (data.length == 0) {
          return res.status(404).json("User not found");
        }
  
        console.log("Provided Password:", req.body.password);
        console.log("Hashed Password:", data[0].password);
  
        const checkpassword = bcrypt.compareSync(req.body.password, data[0].password);
  
        if (!checkpassword) {
          console.log("Password comparison failed.");
          return res.status(400).json("Wrong password or username");
        }
  
        console.log("Login successful.");
        const token = jwt.sign({ id: data[0].id }, "secretkey");
        const { password, ...other } = data[0];
  
        res.cookie("accessToken", token, {
          httpOnly: true,
      
        }).status(200).json(other);
      });
    });
  };


const logout  = (req,res)=>{
    res.cookie("accessToken","",{
        expires:new Date(0),
        httpOnly:true
    }).status(200).json("Sucessfully logged out")
    
   
}
module.exports = {register,login,logout}