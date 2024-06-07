import crypto from "crypto"
import { Token_Payload } from "./types";
import {sign} from "jsonwebtoken";

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

}

export default Helpers; 