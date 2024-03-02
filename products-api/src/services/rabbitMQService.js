const amqp = require("amqplib");

module.exports = class RabbitMQService {

    async sendMessage(queueName, message) {
        try {
            const connection = await amqp.connect(
                `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
            );
            const channel = await connection.createChannel();
            await channel.assertQueue(queueName);
            channel.sendToQueue(queueName, Buffer.from(message));
            console.log("Message sent to RabbitMQ");
            await channel.close();
            await connection.close();
        } catch (error) {
            console.error("Error sending message to RabbitMQ:", error);
        }
    }
}