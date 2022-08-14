import mongoose from "mongoose";

const conn = async ()=>{
    try {
      await mongoose.connect(process.env.MONGO_DB, {
            dbName: "photolite",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.log(error.message)
    }
}

export default conn;