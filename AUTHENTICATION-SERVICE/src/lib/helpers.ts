import crypto from "crypto"
import { Mongoose_User_Type, Token_Payload } from "./types";
import {sign} from "jsonwebtoken";
import { Response } from "express";
import status_codes from "http-status-codes"

class Helpers{
    static hash_password (password:string):string {
        const hash = crypto.createHash('sha256',); 
        hash.update(password);
        return hash.digest('hex');
    }

    static generate_user_token_from_payload(payload:Token_Payload):string|boolean{
        try {
            if(!process.env.JWT_SECRET){
                return false; 
            }
            return sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});
        } catch (error) {
            console.error(error)
            return false 
        }
    }

    static generate_otp(length:number):string{
        const possible_characters = "qwertyuiopasdfghjklzxcvbnm1234567890";
        let otp = "";
        for(let i = 0; i < length; i++){
            const random_index = Math.floor((Math.random()*possible_characters.length));
            otp += possible_characters[random_index];
        }
        return otp; 
    }

    static add_user_token(res:Response,user:Mongoose_User_Type):Response|boolean{
        const token_payload = {
            _id:user._id, 
            is_verified:user.is_verified,
            email_verified:user.email_verified,
            account_verified:user.account_verified
        }
        const token = this.generate_user_token_from_payload(token_payload)
        if(!token){
            return false; 
        }
        res.header({authorization:token}); 
        return true; 
    }

    static handle_internal_server_errors(res:Response,err:unknown,message:string){
        console.error(err); 
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({message}); 
    }

}

export default Helpers; 