import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_KEY } from "../controllers/authController.js";
export const authentication=(req,res,next)=>{
    const header=req.headers.authorization
    if(!header || !header.startsWith("Bearer ")){
        const error=new Error("unauthorized")
        error.statusCode=401
        throw error
    }
    const token=header.split(" ")[1];
    if(!token){
        const error=new Error("unauthorized")
        error.statusCode=401
        throw error
    }
    const decode=jwt.verify(token,ACCESS_TOKEN_KEY)
    const user=await User.findById(decode.user_id)
    if(!user){
        const error=new Error("unauthorized")
        error.statusCode=401
        throw error
    }
    req.user=user
    next()
}