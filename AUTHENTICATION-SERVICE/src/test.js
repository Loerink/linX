const fs = require("fs")
const utils = require("util")
const read_file_promise = utils.promisify(fs.readFile)


async function get_config_file(){
    const file_buffer = fs.readFileSync(`${__dirname}/../../config.json`,"ascii"); 
    const file = JSON.parse(file_buffer)
    console.log(file.service_configs.notification_service_socket_address)
    return file; 
}


console.log(get_config_file())