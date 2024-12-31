    const express=require("express");
    const mongoose=require("mongoose");
    const app=express();
    const port=process.env.PORT||5900;

    const uri="mongodb://localhost:27017/testdb"
    mongoose.connect(uri).
    then(()=>{console.log("Mongodb database connection established")}).
    catch((error)=>{console.log(error)});
    app.use(express.json());
    const empSchema=mongoose.Schema({
    id:Number,
    name:String,
    email:String
    
    });
    const Emp=mongoose.model("emp",empSchema);
    app.post("/",(req,res,next)=>
    {   
        
        res.status(201).json({"Message":data})});
   

    app.listen(port,(req,res,next)=>
    {console.log(`server started sucessfully at port:${port}`)});


    const react=require("react");

    const express=require("express");
    const mongoose=require("mongoose");
    const cookieParser=require("cookie-parser");
    const os=require("os");
    const app=express();
    console.log("");
    console.log(yeue);
    console.log("Hello World",venkyHello_World);
    
    
    
    const {a,b,c}=req.body
        const uri="mongodb://localhost:27017/testdb"
        mongoose.connect(uri)
        .then(()=>
        {console.log("Mongodb database connection established")})
        .catch((error)=>{console.log(error)});
    
    

    

