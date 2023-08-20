const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const app = express()
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));

//connecting to database

mongoose.connect("mongodb://127.0.0.1:27017/testDB")

//creating schema

const testSchema = new mongoose.Schema({
    col1: String,
    col2: Number,
});

//creating mongoose model

const Test = mongoose.model("Test", testSchema); //here in mongoose the first parameter has to be singular and will be converted to prural and form a collection in our database

const test = new Test({
    col1: "first col",
    col2: 2
});

//save the entry

test.save();

// close the connection

// mongoose.connection.close();

//port for server

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//starting server

app.listen(port, function (){
    console.log("server started");
})

app.get("/", function(req, res){
    res.render("home", {appTitle: "hello tffhere"});
})

// need to use async and await for mongodb getting data

app.get("/api/data", async function(req, res){
    const data = await Test.find()
    res.send({"data": data});
})