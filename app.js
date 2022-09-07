import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import cookieParser from "cookie-parser";
import Pagerouter from "./routes/routerPage.js";
import Photorouter from "./routes/routerPhotos.js";
import Userrouter from "./routes/routerUser.js";
import { checkUser } from "./middleware/middleware.js";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import methodOverride from "method-override";

const app = express();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET  
})

//* connected database 
conn();

//* view engine ejs
app.set("view engine","ejs")

//* middleware static public
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true }))
app.use(methodOverride("_method", {
    methods: ["POST","GET"]
}))


//& Router 
app.use("*", checkUser)
app.use("/", Pagerouter)
app.use("/photos", Photorouter)
app.use("/users", Userrouter)


app.listen(3000, ()=> {
    console.log(`connected database`)
})  