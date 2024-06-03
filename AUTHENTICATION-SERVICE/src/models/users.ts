import mongoose from "mongoose";

const users_schema = new mongoose.Schema({
    _id:{type:String,required:true,trim:true}, 
    username:{type:String, required:true, trim:true, maxLenght:20, minLength:2}, 
    firstname:{type:String, required:true, trim:true, maxLenght:50, minLength:2}, 
    lastname:{type:String, required:true, trim:true, maxLenght:50, minLength:2}, 
    password:{type:String, required:true}, 
    is_verified:{type:Boolean, default:false,required:true}, 
    email_verified:{type:Boolean, default:false,required:true}, 
    account_verified:{type:Boolean, default:false,required:true}, 

})

const User = mongoose.model("User", users_schema, "users");
export default User; 