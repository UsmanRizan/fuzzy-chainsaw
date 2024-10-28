import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from '../models/products.model.js';

dotenv.config();

const app = express()

console.log(process.env.MONGO_URI)

app.use(express.json())

app.post("/api/products",async (req,res)=>{
    const product = req.body
    if (!product.name||!product.price||!product.image) {
        return res.status(400).json({success:false,message:"please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({success:true,data:newProduct})
    } catch (error) {
        console.error("Error in creating product:",error.message)
        res.status(500).json({success:false,message:"server error"})
    }

})

app.delete("/api/products/:id",async(req,res)=>{
    const {id} = req.params

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"product deleted"})
    } catch (error) {
        console.error("Error in deleting product:",error.message)
        res.status(500).json({success:false,message:"server error"})
    }

})

app.listen(5000,()=>{
    connectDB();
    console.log("server is ready at https://localhost:5000 ")
})