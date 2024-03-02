
const Order = require('../models/orderModel');

const rabbitMQ = require('../services/rabbitMQService');
const rabbitMQService = new rabbitMQ();

module.exports = class OrdersController {
    async getOrderById(req, res) {
        const { id } = req.params;

        const order = await Order.findById(id);

        return res.status(200).json({
            order,
        });
    }

    async updateOrderStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findById(id);
        console.log(order);

        order.status = status;

        await order.save();

        if (status === "DELIVERED") {
            await rabbitMQService.sendMessage('jobs', order.phone);
        }

        return res.status(200).json({
            order,
        });
    }

    async createOrder(req, res) {

        const body = req.body;

        const order = await Order.create({
            status: "PLACED",
            order: body.order,
            phone: body.phone,
            address: body.address,
        });

        return res.status(200).json({
            order,
        });
    }

    async getAllOrders(req, res) {
        const orders = await Order.find();
        return res.status(200).json({
            orders,
        });
    }
}
