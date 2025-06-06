// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
//import express from "express"
import { app } from "./app.js";
import connectDB from "./db/db.js"

dotenv.config({
    path: './env'
})

//const app=express();

connectDB()

.then(()=>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})

.catch((err) =>{
    console.log("MONGO DB connection failed !!! ", err);
})