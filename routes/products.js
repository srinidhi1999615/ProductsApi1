// Routes (routes.js)
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// API routes
router.post("/create", productsController.addProduct);
router.get("/", productsController.listProducts);
router.delete("/:id", productsController.deleteProduct);
router.post("/:id/update_quantity", productsController.updateQuantity);
router.get("/search", productsController.searchProducts);
module.exports = router;
