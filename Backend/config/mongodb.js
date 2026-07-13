import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const URL=process.env.MONGODB_URL
const mongodb=async()=>{
    try{
        if(!URL){
            console.log("mongo db link is missing")
        }
       const connect = await mongoose.connect(URL);
        console.log("MongoDb is connected",connect.connection.host)
    }
    catch(error){
        console.log("Database connection is failed",error)
    }
}
export default mongodb;