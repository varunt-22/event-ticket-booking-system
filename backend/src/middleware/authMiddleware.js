import jwt from "jsonwebtoken"

const protect=async(req,res,next)=>{
    try {

        let token;


        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token=req.headers.authorization.split(" ")[1];
            console.log(process.env.JWT_SECRET)
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
    
            req.user=decoded;
            next();
        }
        else{
            return res.status(401).json({
                sucess:false,
                message:"Not authorized",
            })
        }


    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:error.message,
        })
    }
}

export default protect;