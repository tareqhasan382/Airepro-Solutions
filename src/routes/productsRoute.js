import express from "express";
import { ProductsController } from "../controllers/productsController.js";
const router = express.Router();
router.get("/products", ProductsController.getProducts);
router.get("/product/:id", ProductsController.getProductById);
router.patch("/product/:id", ProductsController.updateProduct);
router.delete("/product/:id", ProductsController.deleteProduct);
router.post("/product", ProductsController.addProduct);

export const ProductsRoute = router;
