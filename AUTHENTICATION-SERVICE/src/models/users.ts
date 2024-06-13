import mongoose from "mongoose";
import { User} from "../lib/types";
import config_file from "../parsed-config-file";
import Joi from "joi";
const {user_configs} = config_file; 
const {
    maximum_firstname_length,
    minimum_firstname_length,
    minimum_username_length,
    maximum_username_length,
    maximum_lastname_length,
    minimum_lastname_length
} = user_configs; 

const users_schema = new mongoose.Schema<User>({
    _id:{type:String,required:true,trim:true}, 
    username:{
        type:String, 
        required:true, 
        trim:true, 
        maxLenght:maximum_username_length, 
        minLength:minimum_username_length
    }, 
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLenght:maximum_firstname_length, 
        minLength:minimum_firstname_length
    }, 
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLenght:maximum_lastname_length, 
        minLength:minimum_lastname_length
    }, 
    password:{type:String, required:true}, 
    is_verified:{type:Boolean, default:false}, 
    email_verified:{type:Boolean, default:false}, 
    account_verified:{type:Boolean, default:false}, 
})

const user_validation_schemas = {
    validate_register:Joi.object({
        email:Joi.string().email().required(), 
        password:Joi.string().required()
    }), 
    validate_verify_account:Joi.object(
        {
            firstname:Joi.string().min(minimum_firstname_length).max(maximum_firstname_length).required(),
            lastname:Joi.string().min(minimum_lastname_length).max(maximum_lastname_length).required(),
            username:Joi.string().min(minimum_username_length).max(maximum_username_length).required(),
        }
    )
}


const User = mongoose.model("User", users_schema, "users");
export {user_validation_schemas}; 
export default User; 