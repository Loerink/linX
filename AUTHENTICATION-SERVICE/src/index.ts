import Express from "express";  
import http from "http"; 
import {config} from "dotenv"; 
import connect_to_database from "./lib/mogodb"; 
import configure_middleware from "./middleware/configure-middleware";
import configure_routes from "./routes/configure-routes";
import "./parsed-config-file"
import "./lib/types"; 




config(); 
const app = Express(); 
configure_middleware(app); 
configure_routes(app); 

const server = http.createServer(app);
connect_to_database().then(()=>{
  server.listen(process.env.HTTP_PORT,()=>{
    console.log(
        "\x1b[32m%s\x1b[0m",
        `[o] http server listening on port ${process.env.HTTP_PORT}`
      );
})
}).catch(()=>{
  console.error("\x1b[31m%s\x1b[0m","could not connect to mongodb")
})
 

