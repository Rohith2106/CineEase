import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

mongoose.connect(`mongodb+srv://rohith0621:${process.env.MONGODB_PASSWORD}@cluster0.rwspy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>
    app.listen(5000,()=>
    console.log("connected to the db"))
).catch((e)=> console.log(e));
