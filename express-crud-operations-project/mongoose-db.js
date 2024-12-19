const express=require("express");
const mongoose=require("mongoose");


const app=express();

app.use(express.json());

connectionurl="mongodb://localhost:27017/SchoolDb";
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

    "Name": "Venkat12",
    "Email": "hvenkatraman9a@gmail.com",
    "Age": "38",
    "Department": "Software Engineer12"
})


        await newStudent.save()

    res.send("Student Database sucessfully created");
    }
    catch(error){res.status(500).json({message : error.message})}

})
app.post("/student/multiple",async(req,res,next)=>{

    try{
        const result=await Student.insertMany(req.body);
        res.status(201).json({
            "message":"Multiple documents added",
            count:result.length
        });


    }catch(error){res.status(501).send(error.stack);}



})
app.listen(8000,()=>{console.log("Server running at localhost:8000")});
