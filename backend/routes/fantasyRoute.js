import {Router} from "express";
import {isAuthenticated,isAdmin} from "../middlewares/auth.js"
import { createFantasyTeam, deleteTeam, getAllTeams, getFantasyTeam, updateTeam } from "../controllers/FantasyController.js";

const router=Router()

router.route("/").post(isAuthenticated,createFantasyTeam).get(isAuthenticated,getAllTeams)
router.route("/:id").get(isAuthenticated,getFantasyTeam).put(isAuthenticated,updateTeam).delete(isAuthenticated,deleteTeam)


export default router