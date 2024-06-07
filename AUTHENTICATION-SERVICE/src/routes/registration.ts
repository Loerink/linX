import Express from "express";
import StatusCodes from "http-status-codes"
import User from "../models/users"
import Helpers from "../lib/helpers"
import authentication_middleware from "../middleware/authenticate";
import { Request, Response } from "express";
import Otp from "../models/otp";

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


registration_router.post("/verify_email", authentication_middleware,  async (req:Request,res:Response)=>{
    try {
        const {user} = req; 
        const {otp} = req.body; 
        const otp_document = await Otp.findById(otp); 
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({message:"User not found"}); 
        }
        if(!otp_document){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid OTP code"}); 
        }
        if(otp_document.user !== user._id){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid OTP code"})
        }
        user.email_verified = true;
        if(user.account_verified){
            user.is_verified = true; 
        }
        await user.save(); 
        const token_payload = {
            _id:user._id, 
            is_verified:user.is_verified, 
            email_verified:user.email_verified, 
            account_verified:user.account_verified
    	}
        const token =  Helpers.generate_user_token_from_payload(token_payload); 
        if(!token){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during registration"}); 
        }
        return res.header({auth:token}).status(StatusCodes.OK).json({message:"Email Verification Successful"}); 
    }
    catch (error) {
        console.log(error)
	    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during registration"}); 
    }
})

  
export default registration_router; 
