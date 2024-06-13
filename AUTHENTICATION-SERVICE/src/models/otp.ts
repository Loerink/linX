import mongoose from "mongoose";
import config_file from "../parsed-config-file";
const {otp_configs} = config_file; 
const {otp_expiry_time_ms,otp_string_length} = otp_configs; 
import Joi from "joi";

const otp_schema = new mongoose.Schema({
    _id:{
        type:String,
        length:otp_string_length
    },
    user:String,
    time_stamp:{type:Number, default:Date.now }, 
    expiry:{type:Number, default:()=>{return Date.now()+otp_expiry_time_ms}}
})

const otp_validation_schemas = {
    validate_verify_email:Joi.object({
        otp:Joi.string().required().min(otp_string_length).max(otp_string_length)
    })
}
const Otp = mongoose.model("Otp", otp_schema,"otps");

export {otp_validation_schemas}; 
export default Otp; 