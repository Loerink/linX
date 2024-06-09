import fs from "fs"


const file_string = fs.readFileSync(`${__dirname}/../../config.json`,"ascii"); 
const parsed_file = JSON.parse(file_string); 


export default parsed_file; 