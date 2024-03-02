const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("./database/mongo");
const ProductsRoutes = require("./routes/productsRoutes");
const OrdersRoutes = require("./routes/ordersRoutes");
const ErrorMiddleware = require("./middlewares/errorMiddleware");

module.exports = class App {
    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
        this.connectToDatabase();
    }

    setupMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    setupRoutes() {
        this.app.use("/products", ProductsRoutes);
        this.app.use("/orders", OrdersRoutes);
    }

    setupErrorHandling() {
        this.app.use(ErrorMiddleware.handle);
    }

    async connectToDatabase() {
        await mongo.connect();
    }

    startServer(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

