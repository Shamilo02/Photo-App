import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
    username:
    {
        type: String,
        required: [true, "username area is required!"],
        unique: true
    },

    email:
    {
        type: String,
        required: [true, "email area is required!"],
        unique: true,
        validate: [validator.isEmail, "valid email is required!"]

    },

    password:
    {
        type: String,
        required: [true, "password is required!"],
        minLength: [5, "At least 5 character"]
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