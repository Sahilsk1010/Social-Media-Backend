const mysql = require('mysql');


const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Sahilsk@kolh1010",
  database: "msrit",
});

module.exports  = pool;