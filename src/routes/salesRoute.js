import express from "express";
import { SalesController } from "../controllers/salesController.js";
const router = express.Router();

router.get("/sales", SalesController.getSales);
router.get("/sale/:id", SalesController.getSaleById);
router.patch("/sale/:id", SalesController.updateSale);
router.delete("/sale/:id", SalesController.deleteSale);
router.post("/sale", SalesController.addSale);

export const SalesRoute = router;
