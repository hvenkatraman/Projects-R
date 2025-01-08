const mongoose=require("mongoose");


const uri="mongodb://localhost:27017/tododb";

const connectMongodb = async()=>
{	
try{
   await mongoose.connect(uri);
    console.log("Mongodb connection established successfully");
    

}catch(error){
    
    console.log(error.message);
    process.exit(1);
}
}
module.exports = connectMongodb;
