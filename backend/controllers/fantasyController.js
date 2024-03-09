import { catchAsyncHandler } from "../middlewares/catchAsynchandler.js"
import { FantasyTeam } from "../models/fantasyTeamModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import { Player } from "../models/playerModel.js"

export const createFantasyTeam = catchAsyncHandler(async (req, res, next) => {
    const user = req.user._id;
    const { my11 } = req.body;
    //there must be a wicketkeeper&11 players
    if (!my11.length === 11) return next(new ErrorHandler("Team must have 11 players", 404))
    let totalPoints =0
    for (let i = 0; i < 11; i++) {
        let player = await Player.findById(my11[i])
        totalPoints += player.points
    }
   
    const fantasyTeam = await FantasyTeam.create({
        user,
        my11,
        totalPoints
    })
    res.status(200).json({
        success: true,
        message: "Your dream team is created",
        fantasyTeam
    })
})

export const getFantasyTeam = catchAsyncHandler(async (req, res, next) => {
    const fantasyTeam = await FantasyTeam.findById(req.params.id).populate("my11")
    if (!fantasyTeam) return next(new ErrorHandler("No such team exists", 401))
    if(fantasyTeam.user.toString()===req.user._id.toString()){
     await fantasyTeam.getTotalPoints()
    // console.log(totalPoints)
      await  fantasyTeam.save()
    res.status(200).json({
        success: true,
        fantasyTeam
    })
}else{
    res.status(200).json({
        success: true,
        message:"You don't have access to this team"
    })
}
})
export const getAllTeams = catchAsyncHandler(async (req, res, next) => {
    const fantasyTeams = await FantasyTeam.find({}).populate("my11")
    let totalPoints=0;
   // console.log(fantasyTeams[0].my11[0]._id.toString())
    if (!fantasyTeams) return next(new ErrorHandler("No such team exists", 401))
for(let i=0;i<fantasyTeams.length;i++){
    for (let j = 0; j < 11; j++) {
        let player = await Player.findById(fantasyTeams[i].my11[j]._id.toString())
       // console.log(player)
        totalPoints += player.points
    }
    fantasyTeams[i].totalPoints =totalPoints
await fantasyTeams[i].save()

}
    res.status(200).json({
        success: true,
        fantasyTeams
    })
})

export const updateTeam=catchAsyncHandler(async(req,res,next)=>{
    const fantasyTeam = await FantasyTeam.findById(req.params.id)
    const {my11}=req.body
    if (!fantasyTeam) return next(new ErrorHandler("No such team exists", 401))
    if(fantasyTeam.user.toString()===req.user._id.toString()){
await fantasyTeam.updateOne({
    my11
})
const totalPoints=  await fantasyTeam.getTotalPoints()
 await fantasyTeam.save()
 //***make sure player cannot add more than 11 players in frontend
        res.status(200).json({
            success: true,
            fantasyTeam
        })

    }else{
    res.status(200).json({
        success: true,
        message:"You don't have access to this team"
    })
}
})
export const deleteTeam=catchAsyncHandler(async(req,res,next)=>{
    const fantasyTeam = await FantasyTeam.findById(req.params.id)
    if (!fantasyTeam) return next(new ErrorHandler("No such team exists", 401))
    if(fantasyTeam.user.toString()===req.user._id.toString()){
    await fantasyTeam.deleteOne()
    res.status(200).json({
        success:true,
        message:"Team deleted successfully"
    })
}else{
    res.status(200).json({
        success: true,
        message:"You don't have access to this team"
    })
}
})

