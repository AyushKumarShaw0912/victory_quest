import jwt from "jsonwebtoken"
import ErrorHandler from "../utils/errorHandler.js"
import {catchAsyncHandler} from "../middlewares/catchAsynchandler.js"
import { User } from "../models/userModel.js";


export const isAuthenticated=catchAsyncHandler(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token) return next(new ErrorHandler("Invalid user token",404))

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded._id)
    next()
})

export const isAdmin=catchAsyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user._id)
    if(user.role==="user") return next(new ErrorHandler("User is not allowed to access this resource",404))
    else
next()

})