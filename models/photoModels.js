import mongoose from "mongoose";

const  { Schema } = mongoose

const photoSchema = new Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    }, 
    content: {
        type: String, 
        required: true,
        trim: true
    }, 

    url: {
        type:String, 
        required: true
    } , 
    updateAt: {
        type: Date, 
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'users'
    }
})

export default mongoose.model("photos",photoSchema )