import Express from "express";
import StatusCodes from "http-status-codes"
import User from "../models/users"
import Helpers from "../lib/helpers"
import { Authenticated_Request } from "../lib/types";
import authentication_middleware from "../middleware/authenticate";
import { Mongoose_User_Type } from "../lib/types";
import { Request } from "express";

const registration_router = Express.Router();


registration_router.post("/",async (req,res)=>{
    try{
        const {email,password} = req.body; 
        if(await User.exists({_id:email})){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"user already exists"}); 
        }
        const user = {
            _id :email,
            password:Helpers.hash_password(password)
        }
        await User.create(user); 
        const token_payload = {
            _id:email, 
            account_verified:false, 
            email_verified:false, 
            is_verified:false
        }; 
        const token = Helpers.generate_user_token_from_payload(token_payload); 
        if(!token){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during registration"}); 
        }
        //send_otp_email
        //Helpers.send_otp_message(email,otp)
        return res.status(StatusCodes.CREATED).json({message:"Registration successful"}); 
    }
    catch(err){
        console.error(err); 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during registration"}); 
    }

})


registration_router.post("/verify_email", authentication_middleware,  (req:Request,res:Response)=>{
    
    try {
        const {user} = req; 
        const {otp} = req.body; 
        
    } catch (error) {
        
    }
})

export default registration_router; 