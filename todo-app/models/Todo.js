const mongoose=require("mongoose");


const todoSchema=mongoose.Schema({
    title:String,
    description:{type:String,required:true}
    },
    {timestamps:true}
    
    );
const Todo=mongoose.model("todo",todoSchema);

module.exports = Todo;
