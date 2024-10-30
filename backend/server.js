import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express()

console.log(process.env.MONGO_URI)

app.use(express.json())

app.use('/api/products',productRoutes)

app.listen(PORT,()=>{
    connectDB();
    console.log("server is ready at https://localhost:"+PORT)
})