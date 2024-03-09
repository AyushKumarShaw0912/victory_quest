import express,{urlencoded} from "express"
import cors from "cors"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/userRoutes.js"
import PlayerRoutes from "./routes/playerRoute.js"
import TeamRoutes from "./routes/teamRoutes.js"
import FantasyTeamRoutes from "./routes/fantasyRoute.js"
import ErrorMiddleware from "./middlewares/error.js"

config({
    path: "./config/config.env",
  });
const app=express()


app.use(express.json())
app.use(express.urlencoded({
  extended:true
}))
app.use(cookieParser())
app.use(cors())


app.use("/api/v1/user",UserRoutes)
app.use("/api/v1/admin/players",PlayerRoutes)
app.use("/api/v1/admin/team",TeamRoutes)
app.use("/api/v1/fantasy",FantasyTeamRoutes)

export default app
app.use(ErrorMiddleware)