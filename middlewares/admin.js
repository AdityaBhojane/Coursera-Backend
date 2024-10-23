const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config/index.js");

function createMiddleware(secret) {
    return function(req, res, next) {
        try {
            const token = req.headers.token;
            const decoded = jwt.verify(token, secret);
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(403).json({
                message: "You are not signed in"
            });
        }
    };
}

// Use this for admin routes
const adminMiddleware = createMiddleware(JWT_ADMIN_PASSWORD);

module.exports = {
    adminMiddleware
};
