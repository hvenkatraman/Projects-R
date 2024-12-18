const express=require("express");
const mongoose=require("mongoose");

const app=express();

app.use(express.json());

connectionurl="mongodb://localhost:27017/schoolDb";
mongoose.connect(connectionurl)
    .then(()=>{console.log("Mongoose database connection established sucessfully")})
    .catch((error)=>{console.log(error)});

const studentSchema=mongoose.Schema({
    Name:String,
    Email:String,
    Age :Number,
    Department:String
    });

const Student=mongoose.model("student",studentSchema);

app.post("/student/single",async(req,res,next)=>{

    try{

    const {Name,Email,Age,Department}=req.body;

    const newStudent=new Student({
        Name:Name,
        Email:Email,
        Age:Age,
        Department:Department
    });
        await newStudent.save()

    res.send("Student Database sucessfully created");
    }
    catch(error){res.status(500).json({message : error.message})}

})
app.listen(8000,()=>{console.log("Server running at localhost:8000")});
