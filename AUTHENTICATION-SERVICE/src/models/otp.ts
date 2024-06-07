import mongoose from "mongoose";
import config_file from "../../parsed-config-file";

const otp_schema = new mongoose.Schema({
    _id:{
        type:String,
        length:config_file.otp_configs.otp_string_length
    },
    user:String,
    time_stamp:{type:Number, default:Date.now }, 
    expiry:{type:Number, default:()=>{return Date.now()+config_file.otp_configs.otp_expiry_time_ms}}
})


const Otp = mongoose.model("Otp", otp_schema,"otps");

export default Otp; 