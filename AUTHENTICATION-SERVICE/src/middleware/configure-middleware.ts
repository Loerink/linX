import { Express } from "express";
import body_parser from "body-parser"
import cors from "cors"

export default function configure_middleware(app:Express){
    app.use(body_parser()); 
    app.use(
    cors({
        exposedHeaders: ["authorization"],
    })
    );
}