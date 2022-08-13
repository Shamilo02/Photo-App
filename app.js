import express from "express";

const app = express();
const port = 5000; 

app.get("/", (req,res) => {
    res.send("Index sehifesi")
})


app.listen(port, ()=> {
    console.log(`connected database ${port}` )
})  