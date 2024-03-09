import app from "./app.js"
import {connectDb} from "./config/db.js"
import cloudinary from "cloudinary"

connectDb()

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


app.listen(process.env.PORT,()=>{
    console.log("Server is working")
})