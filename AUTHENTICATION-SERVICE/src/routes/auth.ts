import Express from "express";
import status_codes from "http-status-codes"; 
import User from "../models/users"; 
import Helpers from "../lib/helpers"; 
const {OK,UNAUTHORIZED,INTERNAL_SERVER_ERROR} = status_codes; 



const auth_router = Express.Router(); 



auth_router.post("/", async (req,res)=> {
    const {email,password} = req.body; 
    try{
        const user = await User.findById(email)
        if(!user){
            return res.status(UNAUTHORIZED).json({message:"Wrong username/password"}); 
        }
        const hashed_password = Helpers.hash_password(password)
        if(user.password !== hashed_password){
            return res.status(UNAUTHORIZED).json({message:"Wrong username/password"})
        }
        if(!Helpers.add_user_token(res,user)){
            return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error during auth"})
        }; 
        res.status(OK).json({message: "Authentication successful"});
    }
    catch(err){
        Helpers.handle_internal_server_errors(res,err,"Internal server error during auth")
    }   
});

export default auth_router; 