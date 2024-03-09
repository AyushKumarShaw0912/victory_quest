import { catchAsyncHandler } from "../middlewares/catchAsynchandler.js"
import ErrorHandler from "../utils/errorHandler.js"
import getDataUri from "../utils/dataUri.js"
import cloudinary from "cloudinary"
import {Team} from "../models/teamModel.js"
import {Player} from "../models/playerModel.js"

export const createTeam=catchAsyncHandler(async(req,res,next)=>{
    const {name,league}=req.body;
  
    const file=req.file
    //console.log(file)
    if (!name || !league||!file)
    return next(new ErrorHandler("Please enter all fields", 400));
 let team=await Team.findOne({$and:[{name:name},{league:league}]})
 if(team) return next(new ErrorHandler("Team already exists",404))
    const dataUri=getDataUri(file)
    const mycloud=await cloudinary.v2.uploader.upload(dataUri.content)

let players=[]
players=await Player.find({team:name})
//console.log(players)
    team=await Team.create({
        name,
        league,
        players:players,
        logo:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
    })
    res.status(201).json({
        success:true,
        message:"Team created successfully",
        team
    })
})

export const getTeamInfo=catchAsyncHandler(async(req,res,next)=>{
    const team=await Team.findById(req.params.id).populate("players")
    if(!team) return next(new ErrorHandler("No such team found",404));
    res.status(200).json({
        success:true,
        team
    })
})
export const getAllTeams=catchAsyncHandler(async(req,res,next)=>{
    const {league}=req.params
    const teams=await Team.find({league}).populate("players")
    if(!teams) return next(new ErrorHandler("No such team found",404));
    res.status(200).json({
        success:true,
        teams
    })
})
export const deleteTeam=catchAsyncHandler(async(req,res,next)=>{
    const team=await Team.findById(req.params.id)
    if(!team) return next(new ErrorHandler("No such team found",404));
    await cloudinary.v2.uploader.destroy(team.logo.public_id)
    await team.deleteOne()
    res.status(200).json({
        success:true,
        message:"Team deleted successfully"
    })
})