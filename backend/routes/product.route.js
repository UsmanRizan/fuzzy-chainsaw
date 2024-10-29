import express from 'express';
import { createProduct, deleteProducts, getProducts, updateProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/",getProducts)  // get all products

router.post("/", createProduct)  // create a products

router.put("/:id",updateProducts)  // update a products by id

router.delete("/:id",deleteProducts)  // delete products by ID

export default router;