import mongoose from "mongoose";


const teamSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Team name cannot be empty"],
    },
    logo:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    players:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Player"
        }
    ],
    league:{
        type:String
    },
},{
    timestamps:true
})
export const Team=mongoose.model("Team",teamSchema)