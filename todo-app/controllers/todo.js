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
const updateTodoPageController = async(req,res,next)=>
{
    try{

        const {id}=req.query;


        const todo = await Todo.findById(id);



        res.status(201).render("updatetodo.ejs",{title:"Update-Todo",todo});

    }catch(error)
    {
        console.log(error.measage);
    }
}
const updateTodoController = async(req,res,next)=>
{
    try{

        const {id}=req.params;
        const {title,description} = req.body;


        const todo = await Todo.findById(id);


        if(!todo){
            res.status(404).json({message:"todo not found"});
        }



        todo.title=title;
        todo.description=description;
        await todo.save();
        res.redirect("/");


    }catch(error)
    {
        console.log(error.measage);
    }
}
const deleteTodoPageController = (req,res,next)=>
{
    try{

        const {id} =req.query;
        const todo = Todo.findById(id);
        res.status(201).render("deletetodo.ejs",{title:"Delete-Todo",id});

    }catch(error)
    {
        console.log(error.measage);
    }
}
const deleteTodoConfirmationController= async(req,res,next)=>
{
try{
    const {id,confirm} = req.query;


    if (confirm === "yes")
    {
        await Todo.findByIdAndDelete(id);
    

    }


    res.redirect("/");

    
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
module.exports = {homeController,testController,newTodoPageController,deleteTodoPageController,updateTodoPageController,updateTodoController,newTodoController,deleteTodoConfirmationController};
