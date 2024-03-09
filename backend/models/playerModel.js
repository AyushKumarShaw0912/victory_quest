import mongoose from "mongoose";


const playerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Player name cannot be empty"]
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role:{
        type:String,
        enum:["batsman","bowler","all-rounder","wicketkeeper"]
    },
    team:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})
export const Player=mongoose.model("Player",playerSchema)