import mongoose from "mongoose";
import { Player } from "../models/playerModel.js"

const fantasyTeamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    my11: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required:true
        },
        
    ],
    totalPoints:{
        type:Number,
        default:0
    }
    },
    {
        timestamps:true
    })
    
fantasyTeamSchema.methods.getTotalPoints=async function(){
    let totalPoints=0;
    for (let i = 0; i < 11; i++) {
        let player = await Player.findById(this.my11[i])
        //console.log(player)
        totalPoints += player.points
    }
    this.totalPoints=totalPoints
    
    
}


    export const FantasyTeam=mongoose.model("FantasyTeam",fantasyTeamSchema)
