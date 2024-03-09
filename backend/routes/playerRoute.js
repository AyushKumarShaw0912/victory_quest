import {Router} from "express";
import {isAuthenticated,isAdmin} from "../middlewares/auth.js"
import { createPlayer, deletePlayer, getAllPlayers, getPlayerInfo, updatePoints } from "../controllers/playerController.js";
import singleUpload from "../middlewares/multer.js"

const router=Router()

router.route("/create").post(isAuthenticated,isAdmin,singleUpload,createPlayer)
router.route("/delete/:id").delete(isAuthenticated,isAdmin,singleUpload,deletePlayer)
router.route("/").get(isAuthenticated,isAdmin,getAllPlayers)
router.route("/updatepoints/:id").put(isAuthenticated,isAdmin,updatePoints)
router.route("/:id").get(isAuthenticated,isAdmin,getPlayerInfo)

export default router