import mongoose from "mongoose";


export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        if(mongoose.connection.readyState===1){
            console.log("Db connected");
        }
    } catch (error) {
        console.log(error.message)
    }
}