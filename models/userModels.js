import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose; 

const userSchema = new Schema({
    username:{ type: String, required: true, unique: true}, 
    email:   { type: String, required: true, unique: true}, 
    password:{ type: String, required: true }
}, {
    timestamps: true
})


userSchema.pre("save", async function  () {
    
    let user = this; 
    console.log(user.password)
    let haspass = await bcrypt.hash(user.password, 10)
    user.password =  haspass;
    console.log(user.password)
   
})


export default mongoose.model("users", userSchema)