import mongoose from "mongoose";
import { User} from "../lib/types";
import config_file from "../../parsed-config-file";


const users_schema = new mongoose.Schema<User>({
    _id:{type:String,required:true,trim:true}, 
    username:{
        type:String, 
        required:true, 
        trim:true, 
        maxLenght:config_file.user_configs.maximum_username_length, 
        minLength:config_file.user_configs.minimum_username_length
    }, 
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLenght:config_file.user_configs.maximum_firstname_length, 
        minLength:config_file.user_configs.minimum_firstname_length
    }, 
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLenght:config_file.user_configs.maximum_lastname_length, 
        minLength:config_file.user_configs.minimum_lastname_length
    }, 
    password:{type:String, required:true}, 
    is_verified:{type:Boolean, default:false}, 
    email_verified:{type:Boolean, default:false}, 
    account_verified:{type:Boolean, default:false}, 
})

const User = mongoose.model("User", users_schema, "users");
export default User; 