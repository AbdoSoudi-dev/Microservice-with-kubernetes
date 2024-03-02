const Product = require("../models/productModel");

module.exports = class ProductsController {
    async getProducts(req, res) {
        const products = await Product.find();
        return res.status(200).json({
            products,
        });
    }

    async createProduct({ body }, res) {
        const product = await Product.create({
            name: body.name,
            image: body.image,
            description: body.description,
            price: body.price,
        });
        return res.status(200).json({
            product,
        });
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({
            product,
        });
    }

}