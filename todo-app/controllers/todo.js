const express=require("express");
const moment=require("moment");
const Todo=require("../models/Todo.js");


const app = express();

const router = express.Router();
Todo();

const homeController= async(req,res,next)=>
    {
try  
{

    console.log("Rendered listtodo sucessfully");
    const todos = await Todo.find({});
    console.log(todos);
    res.locals.moment = moment;
    
    res.status(201).render("index.ejs",{title:"List-Todo",todos});
}

catch(error){
    res.status(500).json({"message":error.stack});
    
    
}
    
}
const testController=(req,res,next)=>

{
    
    console.log(router.get('views'));
    res.render("test");
}


const newTodoPageController=(req,res,next)=>
{
    res.status(201).render("newtodo.ejs",{title:"New-Todo"});
}
const updateTodoPageController = (req,res,next)=>
{
try{

    res.status(201).render("updatetodo.ejs",{title:"Update-Todo"});

    }catch(error)
    {
        console.log(error.measage);
    }
}
const deleteTodoPageController = (req,res,next)=>
{
try{

    res.status(201).render("deletetodo.ejs",{title:"Delete-Todo"});

    }catch(error)
    {
        console.log(error.measage);
    }
}
const newTodoController = async(req,res,next)=>
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
}
module.exports = {homeController,testController,newTodoPageController,deleteTodoPageController,updateTodoPageController,newTodoController};
