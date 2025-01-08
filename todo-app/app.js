const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const connectMongodb=require("./init/mongodb.js");
const todoRoute=require("./routes/todo.js");

//init app

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//view engine

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

connectMongodb();
app.use("/",todoRoute);

module.exports=app;
