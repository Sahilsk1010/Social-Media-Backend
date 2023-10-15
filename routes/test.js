const express = require('express');
const mysql = require('mysql');

const sa = ()=>{
    const q = "SELECT DISTINCT reserves.sid FROM reserves INNER JOIN sailores WHERE reserves.sid = sailores.sid"
    console.log(q);
}