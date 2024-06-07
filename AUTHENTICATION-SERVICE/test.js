const fs = require("fs")


function print_file(err,file){
 const obj = JSON.parse(file.toString()); 
 console.log(obj); 

   
}
fs.readFile("./config.json",print_file); 


