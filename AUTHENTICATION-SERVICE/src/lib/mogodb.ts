import mongoose from "mongoose";

const connect_to_database = async () => {
        if(process.env.MONGO_URI){
            await mongoose.connect(process.env.MONGO_URI)
            console.log("\x1b[32m%s\x1b[0m","[o] Connected to mongodb ...")
        }
        else{
            console.error("\x1b[31m%s\x1b[0m","No MongoDB URI found")
            throw(new Error()); 
        }
}

export default connect_to_database