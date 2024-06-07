import fs from "fs"
import path from "path"

let config_file:any = null; 

function parse_json_file_to_object(err:NodeJS.ErrnoException|null,file:Buffer){
 const file_string = file.toString(); 
 const obj = JSON.parse(file_string); 
 config_file = obj; 
}


fs.readFile(`${__dirname}/../config.json`,parse_json_file_to_object); 


export default config_file; 