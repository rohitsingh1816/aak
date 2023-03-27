const express=require("express");
const cors=require("cors");
require("dotenv").config();
const {connection}=require("./config/db.js");
const {userRouter}=require("./routes/user.route.js");
const {noteRouter}=require("./routes/note.router.js");
const {authenticate}=require("./middlewares/authenticate.mw.js")
const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page");
})

app.use("/users",userRouter);
app.use(authenticate);
app.use("/notes",noteRouter);

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err){
        console.log("Error connecting to DB:", err);
    }
    console.log(`Server running on ${process.env.port}`);
})