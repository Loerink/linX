import fs from "fs"



function parse_json_file_to_object(){
    const file_string = fs.readFileSync(`${__dirname}/../../config.json`,"ascii"); 
    return JSON.parse(file_string); 
}





export default parse_json_file_to_object(); 