export const authorization = (...roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            const error = new Error("user not unautherized");
            error.statusCode = 401;
            throw error;
        }
        if(!roles.includes(req.user.role)){
            const error = new Error("forbidden: insuffient role");
            error.statusCode = 401;
            throw error;
        
        }
        next();
    
    }
}