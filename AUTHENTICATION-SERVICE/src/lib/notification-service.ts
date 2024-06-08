import axios from "axios";
import config_file from "../parsed-config-file";

class Notification_Service{
    
    static async send_otp_email(email:string,otp:string):Promise<boolean>{
        const notification_service_ip = config_file.service_configs.notification_service_socket_address[0]; 
        const notification_service_port = config_file.service_configs.notification_service_socket_address[1]; 
        try{
        const res = await axios.post(`http://${notification_service_ip}:${notification_service_port}/send_otp`,{email,otp}); 
        if(res.status >= 400){
            return false; 
        }
        else return true; 
        }
        catch(error){
            console.error(error); 
            return false; 
        }
    }

}

export default Notification_Service; 