const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const bodyParser=require("body-parser");
const moment=require("moment");





//init app

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port=process.envPORT || 8000;

//view engine

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


const uri="mongodb://localhost:27017/tododb"

mongoose.connect(uri)
.then(()=>{console.log("Mongodb database connection established")})
.catch((error)=>{console.log(error)});

const todoSchema=mongoose.Schema({
    title:String,
    description:{type:String,required:true}
    
},{timestamps:true});



const Todo=mongoose.model("todo",todoSchema);


app.get("/",async(req,res,next)=>
    {
try  
{

    console.log("Rendered listtodo sucessfully");
    const todos= await Todo.find({});
    console.log(todos);
    res.locals.moment =moment;
    
    res.status(201).render("index.ejs",{title:"List-Todo",todos});
}

catch(error){
    res.status(500).json({"message":error.stack});
    
    
}
    
})
app.get("/test",(req,res,next)=>

{
    console.log(app.get('views'));
    res.render("test");
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
app.post("/newtodo",async(req,res,next)=>
{
try{
   const {title,description}=req.body;
    // const data= req.body;
    // console.log(data);
    
    

    const newTodo = new Todo({title,description});
    await newTodo.save();

    res.redirect("/");

    }catch(error)
    {
        console.log(error.measage);
    }
});



//listen to server

app.listen(port,(req,res,next)=>{console.log(`server started sucessfully at port:${port}`)});



