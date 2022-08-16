import mongoose from "mongoose";

const  { Schema } = mongoose

const photoSchema = new Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    }, 
    desc: {
        type: String, 
        required: true,
        trim: true
    }, 
    photo: {
        type: Date, 
        default: Date.now
    }
})

export default mongoose.model("photos",photoSchema )