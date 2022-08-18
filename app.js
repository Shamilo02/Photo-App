import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import Pagerouter from "./routes/routerPage.js";
import Photorouter from "./routes/routerPhotos.js";
import Userrouter from "./routes/routerUser.js";
const app = express();
// app.use(express.json())
const port = 3000; 

dotenv.config();

//* connected database 
conn();

//* view engine ejs
app.set("view engine","ejs")

//* middleware static public
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//& Router 
app.use("/", Pagerouter)
app.use("/photos", Photorouter)
app.use("/users", Userrouter)


app.listen(port, ()=> {
    console.log(`connected database ${port}`)
})  