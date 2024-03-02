const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/ordersController");
const ordersController = new OrdersController();

router.get("/:id", ordersController.getOrderById);
router.put("/:id", ordersController.updateOrderStatus);
router.post("/", ordersController.createOrder);
router.get("/", ordersController.getAllOrders);

module.exports = router;