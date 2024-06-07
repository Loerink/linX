import { Request,Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/users";
import jwt from "jsonwebtoken"; 

async function authentication_middleware(req:Request,res:Response,next:NextFunction){
    const auth = req.headers.authorization; 
    if(!auth){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"No token found in request headers"}); 
    }
    if(!process.env.JWT_SECRET){
        console.error("No JWT_SECRET in env variables"); 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error during auth"}); 
    }
    const token_payload = jwt.verify(auth, process.env.JWT_SECRET); 
    if(!token_payload || typeof(token_payload) == "string"){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid token found in request headers"}); 
    }
    const user = await  User.findById(token_payload._id); 
    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid token found in request headers"}); 
    }
    req.user = user; 
    next()
}


export default authentication_middleware; 