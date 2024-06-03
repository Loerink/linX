import crypto from "crypto"

class Helpers{
    static hash_password (password:string):string {
        const hash = crypto.createHash('sha256',); 
        hash.update(password);
        return hash.digest('hex');
    }

}

export default Helpers; 