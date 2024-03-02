module.exports = class AuthenticationMiddleware {
    authenticate(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = req.headers.authorization.split(' ')[1];
        if (token !== 'secret') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }
}
