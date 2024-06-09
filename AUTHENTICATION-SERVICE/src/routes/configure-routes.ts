import { Express } from "express";
import auth_router from "./auth";
import registration_router from "./registration";



export default function configure_routes(app:Express){
    app.use("/api/auth",auth_router); 
    app.use("/api/register",registration_router)
}; 