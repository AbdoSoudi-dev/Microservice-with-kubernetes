const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/productsController");
const productsController = new ProductsController();

router.get("/", productsController.getProducts);
router.post("/", productsController.createProduct);

module.exports = router;