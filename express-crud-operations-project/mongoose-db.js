const express=require("express");
const mongoose=require("mongoose");


const app=express();

app.use(express.json());

connectionurl="mongodb://localhost:27017/SchoolDb";
mongoose.connect(connectionurl)
    .then(()=>{console.log("Mongoose database connection established sucessfully")})
    .catch((error)=>{console.log(error)});

const studentSchema=mongoose.Schema({
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

app.put("/student/single",async (req,res,next)=>{
    
  try{
  
   const {Department}=req.body;
   const {Email}=req.query;
//    const {id}=req.params;
  await Student.findOneAndUpdate({Email},{Department});
//    const studentFound=Student.findOne({_id:id});
//    student.Department=Department;
//    await student.save
   res.status(200).json({
    "message":"updated single student Document using email from query"
    
   });


  }
  catch(error)
  {
        res.status(501).json({"message": error.message})
  }

});
  

app.put("/student/single/age/:id",async (req,res,next)=>{
    
    try{
     const {id}=req.params
     const {Age}=req.body;
  //    const {Email}=req.query;
  //   await Student.findOneAndUpdate({Email},{Department});
     const student=await Student.findById(id);

// Check if student exists
    if (!student) { return res.status(404).json({ message: "Student not found" }); }

     student.Age=Age;
     await student.save();
     res.status(200).json({
      "message":"updated single student Document Age using _id from params"
      
     });
  
  
    }
    catch(error)
    {
          res.status(501).json({"message": error.stack})
    }
  


});





app.put("/student/single/department/:id",async (req,res,next)=>{
    
    try{
     const {id}=req.params
     const {Department}=req.body;
  //    const {Email}=req.query;
  //   await Student.findOneAndUpdate({Email},{Department});
     const student=await Student.findOne({_id:id});

// Check if student exists
    if (!student) { return res.status(404).json({ message: "Student not found" }); }

     student.Department=Department;
     await student.save();
     res.status(200).json({
      "message":"updated single student Document Department using _id from params"
      
     });
  
  
    }
    catch(error)
    {
          res.status(501).json({"message": error.stack})
    }
  


});

app.put("/student/multiple/department",async (req,res,next)=>{

    try{

        const {Department}=req.body
        const {Email}=req.query
    result=await Student.updateMany({Email},{Department});
        res.status(201).json({
            "message":"Multiple student updated sucessfully whose count is below",
            "count":result.count

        });

    }catch(error)
    {res.status(501).json({"message": error.message})
}
})


app.get("/student/single",async(req,res,next)=>{

    try{

        const {Email}=req.query

       const student=await Student.findOne({Email})

       res.status(200).json({data:student})


    }catch(error)
    {
        res.status(501).json({"message":error.message})  ; }
})



app.get("/student/multiple",async(req,res,next)=>{

    try{

        const {Email}=req.query

       const student=await Student.find({Email})

       res.status(200).json({data:student})


    }catch(error)
    {
        res.status(501).json({"message":error.message})  ; }
})

app.delete("/student/single",async(req,res,next)=>{

    try{

        const {Age}=req.body

       const student=await Student.findOneAndDelete({Age})

       res.status(200).json({data:student})


    }catch(error)
    {
        res.status(501).json({"message":error.message})  ; }
})



app.delete("/student/multiple",async(req,res,next)=>{

    try{

        const {Age}=req.body

       const student=await Student.deleteMany({Age})

       res.status(200).json({data:student})


    }catch(error)
    {
        res.status(501).json({"message":error.message})  ; }
})






app.listen(8000,()=>{console.log("Server running at localhost:8000")});
