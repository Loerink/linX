import { Request } from "express";
import { HydratedDocument } from 'mongoose'

type User = {
    _id:string,
    username:string,
    firstname:string,
    lastname:string,
    password:string,
    is_verified:boolean,
    email_verified:boolean,
    account_verified:boolean,
}
type Mongoose_User_Type = HydratedDocument<User>

type Token_Payload={
    _id:string, 
    is_verified:boolean,
    account_verified:boolean,
    email_verified:boolean
}
interface Authenticated_Request extends Request{
    user:Mongoose_User_Type
}

declare global {
    namespace Express{
        interface Request{
            user?:Mongoose_User_Type
        }
    }
}

export {
    Token_Payload,
    Authenticated_Request,
    Mongoose_User_Type,
    User
}; 
    

