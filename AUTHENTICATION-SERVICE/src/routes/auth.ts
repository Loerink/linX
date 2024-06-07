import Express from "express";
import StatusCodes from "http-status-codes"
import User from "../models/users"
import Helpers from "../lib/helpers"



const auth_router = Express.Router(); 



auth_router.post("/", async (req,res)=> {
    const {email,password} = req.body; 
    try{
        const user = await User.findById(email)
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"Wrong username/password"}); 
        }
        const hashed_password = Helpers.hash_password(password)
        if(user.password !== hashed_password){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"Wrong username/password"})
        }

        // Send token in response headers 
        const token_payload = {
            _id:user._id, 
            is_verified:user.is_verified,
            email_verified:user.email_verified,
            account_verified:user.account_verified
        }
        const token = Helpers.generate_user_token_from_payload(token_payload)
        if(!token){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error during auth"});
        }
        res.status(StatusCodes.OK).header({auth:token}).json({message: "Authentication successful"});
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during auth"})
        console.error("Error during auth", err);  
    }   
});

export default auth_router; 