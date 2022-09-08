import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
        required: [true, 'Resim bolmesi bosh ola bilmez.']
    }, 

    image_id: {
        type: String
    },
    password:
    {
        type: String,
        required: true,
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


userSchema.pre("save", async function () {

    let user = this;
    console.log(user.password)
    let haspass = await bcrypt.hash(user.password, 10)
    user.password = haspass;
    console.log(user.password)

})


export default mongoose.model("users", userSchema)