import Express from "express" 
import http from "http"
import dotenv from "dotenv"
import Helpers from "./lib/helpers"
import connect_to_database from "./lib/mogodb"
import StatusCodes from "http-status-codes"
import User from "./models/users"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config(); 

const body_parser = require("body-parser"); 
connect_to_database()

const app = Express(); 
app.use(body_parser()); 

app.post("/api/auth", async (req,res)=> {
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
            id:user._id, 
            is_verified:user.is_verified,
            email_verified:user.email_verified,
            account_verified:user.account_verified
        }
        if(!process.env.JWT_SECRET){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during auth"})
        }
        const token = jwt.sign(token_payload, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(StatusCodes.OK).header({auth:token}).json({message: "Authentication successful"});
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during auth"})
        console.error("Error during auth", err);  
    }   
});

const server = http.createServer(app); 

server.listen(process.env.HTTP_PORT,()=>{
    console.log(
        "\x1b[32m%s\x1b[0m",
        `[o] http server listening on port ${process.env.HTTP_PORT}`
      );
})