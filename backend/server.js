import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from '../models/products.model.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express()

console.log(process.env.MONGO_URI)

app.use(express.json())

app.use('/api/products',productRoutes)

app.listen(5000,()=>{
    connectDB();
    console.log("server is ready at https://localhost:5000 ")
})