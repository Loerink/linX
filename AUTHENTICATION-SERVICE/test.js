const path = require("path")
const os = require("os")
const fs = require("fs")



fs.readFile(`${__dirname}/../config.json`,(err,data)=>{
    console.log(data.toString())
})
