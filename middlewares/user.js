const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config/index.js");

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    // Check if token exists
    if (!token) {
        return res.status(403).json({
            message: "Token is required"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decoded.id;  // Assuming `id` is stored in JWT
        next();  // Call next to proceed to the next middleware or route handler
    } catch (error) {
        // Handle invalid token
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    userMiddleware
};
