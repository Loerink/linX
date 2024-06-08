import Express from "express";  
import http from "http"; 
import dotenv from "dotenv"; 
import connect_to_database from "./lib/mogodb"; 
import auth_router from "./routes/auth"; 
import registration_router from "./routes/registration"; 
import cors from "cors"; 
import "./lib/types"

dotenv.config(); 

const body_parser = require("body-parser"); 
connect_to_database()

const app = Express(); 
app.use(body_parser()); 
app.use(
  cors({
    exposedHeaders: ["authorization"],
  })
);
app.use("/api/auth",auth_router); 
app.use("/api/register",registration_router)


const server = http.createServer(app); 
server.listen(process.env.HTTP_PORT,()=>{
    console.log(
        "\x1b[32m%s\x1b[0m",
        `[o] http server listening on port ${process.env.HTTP_PORT}`
      );
})
