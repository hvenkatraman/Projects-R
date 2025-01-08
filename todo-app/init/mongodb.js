const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

const uri=process.env.URI;

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
