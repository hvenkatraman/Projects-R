
const app=require("./app");
const dotenv=require("dotenv");

dotenv.config();

const port=process.env.PORT || 8000;
console.log (process.env.NAME);


//listen to server

app.listen(port,(req,res,next)=>{console.log(`server started sucessfully at port:${port}`)});



