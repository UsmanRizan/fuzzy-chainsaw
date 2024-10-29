import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from '../models/products.model.js';

dotenv.config();

const app = express()

console.log(process.env.MONGO_URI)

app.use(express.json())

app.get("/api/products",async (req,res)=>{

    try {
        const products = await Product.find({})
        res.status(200).json({success:true,data:products})
    } catch (error) {
        console.error("Error in getting products:",error.message)
        res.status(500).json({success:false,message:"server error"})
    }

})  // get all products

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

})  // create a products

app.put("/api/products/:id",async(req,res)=>{
    const {id} = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the id is valid
        return res.status(404).json({success:false,message:"Invalid product id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,data:updatedProduct})
    } catch (error) {
        console.error("Error in updating product:",error.message)
        res.status(500).json({success:false,message:"server error"})
    }

})  // update a products by id

app.delete("/api/products/:id",async(req,res)=>{
    const {id} = req.params

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"product deleted"})
    } catch (error) {
        res.status(404).json({success:false,message:"product not found"})
    }

})

app.listen(5000,()=>{
    connectDB();
    console.log("server is ready at https://localhost:5000 ")
})