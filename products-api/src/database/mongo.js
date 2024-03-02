const mongoose = require("mongoose");

class mongo {
    constructor() {
        this.isConnected = false;
    }

    async connect() {
        if (!this.isConnected) {
            try {
                mongoose.set('strictQuery', false);
                await mongoose.connect(
                    `mongodb://${process.env.MONGODB_HOST}/products`,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    }
                );
                this.isConnected = true;
                console.log("Connected to MongoDB");
            } catch (error) {
                console.error("Error connecting to MongoDB:", error);
            }
        }
    }
}

module.exports = new mongo();