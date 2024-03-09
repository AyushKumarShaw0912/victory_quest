import { catchAsyncHandler } from "../middlewares/catchAsynchandler.js"
import { User } from "../models/userModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import { sendToken } from "../utils/sendToken.js"



export const register=catchAsyncHandler(async(req,res,next)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

let user = await User.findOne({ email })
if (user) {
    return next(new ErrorHandler("User already exists", 401))
}
user=await User.create({
    username,
    email,
password
})
sendToken(res, user, "Registration successful", 201)
})

export const login=catchAsyncHandler(async(req,res,next)=>{
    const {email,password} =req.body;
    if (!email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));
const user = await User.findOne({ email }).select("+password")
if (!user) {
    return next(new ErrorHandler("Incorrect email or password", 404))
}
const isMatch = await user.comparePassword(password)
if (!isMatch) return next(new ErrorHandler("Incorrect email or password", 404))
sendToken(res, user, `Welcome back ${user.username}`, 200)
})

export const logout = catchAsyncHandler(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        //secure: true,
        //sameSite: "none",
    }).json({
        success: true,
        message: "Logout successful"
    })
})
export const getAllUsers=catchAsyncHandler(async(req,res,next)=>{
    const users=await User.find({})
    res.status(200).json({
        success: true,
        users
    })
})
export const changeRole=catchAsyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user) return next(new ErrorHandler("No user found",404))
    if(user.role==="user"){
        user.role="admin"
    }else{
        user.role="user"
    }
    await user.save()
    res.status(200).json({
        success: true,
        message: "User role updated Successfully",
    });

})