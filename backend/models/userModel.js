import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username cannot be empty"],
    },
    email:{
        type:String,
        required:[true,"Email cannot be empty"],
        validate:validator.isEmail,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password cannot be empty"],
        select: false,
        minLength: [6,"Password must exceed 6 characters"]
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
},
{
    timestamps:true,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
}
)

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};



export const User=mongoose.model("User",userSchema)