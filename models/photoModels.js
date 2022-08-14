import mongoose from "mongoose";

const  { Schema } = mongoose

const photoSchema = new Schema({
    name: {
        type: String, 
        require: true,
        trim: true
    }, 
    description: {
        type: String, 
        require: true,
        trim: true
    }, 
    uploadPhoto: {
        type: Date, 
        default: Date.now
    }
})

export default mongoose.model("photos",photoSchema )