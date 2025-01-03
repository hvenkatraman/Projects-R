const express=require("express");
const mongoose=require("mongoose");
const path=require("path");


//init app

const app=express();
const port=process.envPORT || 8000;

//view engine

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

const uri="mongodb://localhost:27017/testdb"

mongoose.connect(uri)
.then(()=>{console.log("Mongodb database connection established")})
.catch((error)=>{console.log(error)});

app.get("/",(req,res,next)=>
{
    console.log("Rendered listtodo sucessfully");
    
    res.status(201).render("index.ejs",{title:"List-Todo"});
});
app.get("/newtodo",(req,res,next)=>
{
    res.status(201).render("newtodo.ejs",{title:"New-Todo"});
})
app.get("/updatetodo",(req,res,next)=>
{
try{

    res.status(201).render("updatetodo.ejs",{title:"Update-Todo"});

    }catch(error)
    {
        console.log(error.measage);
    }
});
app.get("/deletetodo",(req,res,next)=>
{
try{

    res.status(201).render("deletetodo.ejs",{title:"Delete-Todo"});

    }catch(error)
    {
        console.log(error.measage);
    }
});

//listen to server

app.listen(port,(req,res,next)=>{console.log(`server started sucessfully at port:${port}`)});



