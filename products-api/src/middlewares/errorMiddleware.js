module.exports = class ErrorMiddleware {

    static handle(error, req, res, next) {
        res.status(error.statusCode || 500).json({
            error: error.message
        });
    }
}