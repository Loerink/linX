import mongoose from "mongoose";

const connect_to_database = async () => {
    try{
        if(process.env.MONGO_URI){
            await mongoose.connect(process.env.MONGO_URI)
            
            console.log("\x1b[32m%s\x1b[0m","[o] Connected to mongodb ...")
        }
        else{
            console.error("No MongoDB URI found")
            process.exit(1)
        }
            
        
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }  
}

export default connect_to_database