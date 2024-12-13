const express =require("express");

const mongodb=require("mongodb")

const app= express();

const admin =express.Router();
const student=express.Router();


//url="mongodb://localhost:27017"
//client= mongodb.MongoClient(url);

//db=client.db(school);
app.use(express.json());
//app.use(express.text());
//app.use(express.raw());

app.use('/admin',admin);
app.use('/student',student);


admin.get("/user",(req,res,next)=>{console.log("Admin area of user GET at : /user")});




app.get("/",(req,res,next)=>{res.send("Get method at root location : /")});
app.get("/crud",(req,res,next)=>{res.send("Its a GET method in: /crud")});

app.get("/user/:id",(req,res,next)=>{
      const  id_as_params= req.params;
      console.log(id_as_params);
    res.send("Its a GET user with params method in : /user")});

app.get("/user/:DepartmentId/:Name",(req,res,next)=>{
    const  id_as_params= req.params;
    const  {DepartmentId,Name}= req.params;
    console.log(`DepartmentId : ${DepartmentId} Name : ${Name}`);

      console.log(id_as_params);
      res.send("Its a GET user/Department/Name with params method in : /user/Department/Name")});


app.get("/site",(req,res,next)=>{
    const name_email_query=req.query;
    console.log(name_email_query);
    res.send("Get method to query username and email at /site ")});

app.post("/crud",(req,res,next)=>{

    const data =(req.body)
    const {Name,Age,Height} =(req.body)
    console.log(`Name : ${Name} Age : ${Age} Height : ${Height}`);

    console.log(data);
    res.send("Its a POST method in : /crud")});
app.put("/crud",(req,res,next)=>{res.send("Its a PUT method in: /crud")});
app.patch("/crud",(req,res,next)=>{res.send("Its a PATCH method in: /crud")});
app.head("/crud",(req,res,next)=>{res.send("Its a HEAD method in: /crud")});
app.options("/crud",(req,res,next)=>{res.send("Its a OPTIONS method in: /crud")});
app.delete("/crud",(req,res,next)=>{res.send("Its a DELETE method in : /crud")});

app.listen(8000,()=>{console.log("Server sucessfully created at port : 8000")});
