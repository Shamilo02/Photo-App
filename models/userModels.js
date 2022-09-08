import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username:
    {
        type: String,
        required: true,
        unique: true
    },
    fullname:
    {
        type: String,
        required: true,
        trim:true
    },
    email:
    {
        type: String,
        required:true, 
        unique: true,

    },

    bio: {
        type:String, 
        required: true,
        trim:true
    }, 
    url : {
        type:String, 
        required:true
    }, 

    image_id: {
        type: String
    },
    password:
    {
        type: String,
        require: true,
        trim:true
    }, 
    followings : [ 
       { type: Schema.Types.ObjectId, ref:'users' } 
    ], 
    followers: [ 
       { type: Schema.Types.ObjectId, ref:'users' } 
    ]

}, {
    timestamps: true
})


export default mongoose.model("users", userSchema)