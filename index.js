var express = require("express"); 
const bodyParser = require('body-parser');
var app = express();
var mysql = require("mysql");
const cors = require('cors');

var db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "wether-visitor",
});

var http = require('http');
const { response, json } = require("express");


app.get("/api/count", (req, res) =>{

    let userCount=0;
    let count =0;
    const sqlSelect = "SELECT count FROM visitorcount where id=1";
    db.query(sqlSelect, (err, result) => {
    if (err) throw err;
        userCount = (result[0].count);

        console.log(userCount);
    });
    count = userCount+1;
    const sqlUpdate = "UPDATE visitorcount SET count =? WHERE id = 1;";
    db.query(sqlUpdate, [count], (err, result) => {
        if (err) console.log(err);
    });
    res.end();
});

app.listen(3001, ()=>{
    console.log("runnining on server 3001");
});