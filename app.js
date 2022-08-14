import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import Pagerouter from "./routes/routerPage.js";
const app = express();
const port = 3000; 

dotenv.config();

//* connected database 
conn();

//* view engine ejs
app.set("view engine","ejs")

//* middleware static public
app.use(express.static('public'))


//& Router 

app.use("/", Pagerouter)



app.listen(port, ()=> {
    console.log(`connected database ${port}` )
})  