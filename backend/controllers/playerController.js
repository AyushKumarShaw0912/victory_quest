import { Player } from "../models/playerModel.js"
import { catchAsyncHandler } from "../middlewares/catchAsynchandler.js"
import getDataUri from "../utils/dataUri.js"
import cloudinary from "cloudinary"
import ErrorHandler from "../utils/errorHandler.js"

export const createPlayer = catchAsyncHandler(async (req, res, next) => {
    const { name, team, role } = req.body;
    const file = req.file;
    console.log(name, team, role)

    if (!name || !team || !role || !file)
        return next(new ErrorHandler("Please enter all fields", 400));
    const dataUri = getDataUri(file)
    const mycloud = await cloudinary.v2.uploader.upload(dataUri.content)

    const player = await Player.create({
        name,
        team,
        role,
        avatar: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        }
    })
    res.status(201).json({
        success: true,
        message: "Player created successfully",
        player
    })

})
export const deletePlayer = catchAsyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id)
    if (!player) return next(new ErrorHandler("No player found", 404))
    await cloudinary.v2.uploader.destroy(player.avatar.public_id)
    await player.deleteOne()
    res.status(200).json({
        success: true,
        message: "Player deleted successfully"
    })
})

export const getAllPlayers = catchAsyncHandler(async (req, res, next) => {
    const players = await Player.find({})
    res.status(200).json({
        success: true,
        message: "All players fetched",
        players
    })
})

export const updatePoints = catchAsyncHandler(async (req, res, next) => {
    const { points } = req.body
    const player = await Player.findById(req.params.id)
    if (!player) return next(new ErrorHandler("No player found", 404))
    player.points = points
    player.save()
    res.status(200).json({
        success: true,
        message: "Player point updated successfully"
    })
})
export const getPlayerInfo = catchAsyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id)
    if (!player) return next(new ErrorHandler("No player found", 404))
    res.status(200).json({
        success: true,
        message: "Player found",
        player
    })
})