import Express from "express";
import status_codes from "http-status-codes"
import User from "../models/users"
import Helpers from "../lib/helpers"
import authentication_middleware from "../middleware/authenticate";
import Otp from "../models/otp";
import config_file from "../parsed-config-file";
import Notification_Service from "../lib/notification-service";
import { user_validation_schemas } from "../models/users";
import { otp_validation_schemas } from "../models/otp";
const {validate_verify_email} = otp_validation_schemas
const {validate_verify_account,validate_register} = user_validation_schemas
const {OK,INTERNAL_SERVER_ERROR,BAD_REQUEST,CREATED, NOT_FOUND, CONFLICT} = status_codes
const registration_router = Express.Router();




registration_router.post("/",async (req,res)=>{
    try{
        const { error } = validate_register.validate(req.body);
        if(error){
            return res.status(BAD_REQUEST).json({message:error.details[0].message})
        }
        const {email,password} = req.body; 
        if(await User.exists({_id:email})){
            return res.status(CONFLICT).json({message:"user already exists"}); 
        }
        const user = await User.create({
            _id :email,
            password:Helpers.hash_password(password)
        }); 
        if(!Helpers.add_user_token(res,user)){
            return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error during registration"})
        }; 
        const otp = Helpers.generate_otp(config_file.otp_configs.otp_string_length); 
        await Otp.create({_id:otp}); 
        const email_sent_successfully = await Notification_Service.send_otp_email(email,otp); 
        if(!email_sent_successfully){
            await Otp.findOneAndDelete({_id:otp}); 
            return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error occured trying to send otp"});
        }
        return res.status(CREATED).json({message:"Registration successful"}); 
    }
    catch(err){
        Helpers.handle_internal_server_errors(res,err,"Internal server error occured during registration"); 
    }

})


registration_router.post("/verify_email", authentication_middleware,  async (req,res)=>{
    try {
        const { error } = validate_verify_email.validate(req.body);
        if(error){
            return res.status(BAD_REQUEST).json({message:error.details[0].message})
        }
        const {user} = req; 
        const {otp} = req.body; 
        const otp_document = await Otp.findById(otp); 
        if(!user){
            return res.status(NOT_FOUND).json({message:"User not found"}); 
        }
        if(user.is_verified || user.email_verified ){
            return res.status(BAD_REQUEST).json({message:"Email already verified"}); 
        }
        if(!otp_document || otp_document.user !== user._id){
            return res.status(BAD_REQUEST).json({message:"Invalid OTP code"}); 
        }
        user.email_verified = true;
        if(user.account_verified){
            user.is_verified = true; 
        }
        await user.save(); 
        if(!Helpers.add_user_token(res,user)){
            return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error during auth"})
        }; 
        return res.status(OK).json({message:"Email Verification Successful"}); 
    }
    catch (err) {
            Helpers.handle_internal_server_errors(res,err,"Internal server error during email verification"); 
    }
})

registration_router.post("/verify_account", authentication_middleware, async (req,res)=>{
    try {
        const { error } = validate_verify_account.validate(req.body);
        if(error){
            return res.status(BAD_REQUEST).json({message:error.details[0].message})
        }
        const {user} = req
        const {firstname,lastname,username} = req.body 
        if(!user){
            return res.status(NOT_FOUND).json({message:"User not found"}); 
        }
        if(user.is_verified || user.account_verified ){
            return res.status(BAD_REQUEST).json({message:"Account already verified"});
        }
        user.firstname = firstname; 
        user.lastname = lastname;
        user.username = username;
        user.account_verified = true; 
        if(user.email_verified){
            user.is_verified = true; 
        }
        await user.save();
        if(!Helpers.add_user_token(res,user)){
            return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error during auth"})
        }; 
        return res.status(OK).json({message:"Account Verification Successful"}); 
    } catch (err) {
        Helpers.handle_internal_server_errors(res,err,"Internal server error occured during registration"); 
    }
})

registration_router.post("/resend_email", authentication_middleware, async (req, res)=>{
    //
})


  
export default registration_router; 
