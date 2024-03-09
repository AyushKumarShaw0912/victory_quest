import {Router} from "express"
import {isAuthenticated,isAdmin} from "../middlewares/auth.js"
import { changeRole, getAllUsers, login, logout, register } from "../controllers/userController.js"


const router=Router()

router.route("/signin").post(register)
router.route("/login").post(login)
router.route("/logout").post(isAuthenticated,logout)
router.route("/admin/allusers").get(isAuthenticated,isAdmin,getAllUsers)
router.route("/admin/change-role/:id").post(isAuthenticated,isAdmin,changeRole)

export default router