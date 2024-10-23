import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';

dotenv.config();

const app = express()

console.log(process.env.MONGO_URI)

app.get("/products",(req,res)=>{
    res.send("Hello")
})

app.listen(5000,()=>{
    connectDB();
    console.log("server is ready at https://localhost:5000 ")
})