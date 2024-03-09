import {Router} from "express"
import {isAuthenticated,isAdmin} from "../middlewares/auth.js"
import singleUpload from "../middlewares/multer.js"
import { createTeam, deleteTeam, getAllTeams, getTeamInfo } from "../controllers/teamController.js"

const router=Router()

router.route("/").post(isAuthenticated,isAdmin,singleUpload,createTeam)
router.route("/league/:league").get(isAuthenticated,getAllTeams)
router.route("/:id").get(isAuthenticated,getTeamInfo).delete(isAuthenticated,isAdmin,singleUpload,deleteTeam)

export  default router