import express from "express"
import cors from "cors"
import {config} from "dotenv"


config({
    path: "./config/config.env",
  });
const app=express()



app.use(express.json())
app.use(cors())

export default app