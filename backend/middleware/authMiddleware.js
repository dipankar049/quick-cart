const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    try {
        const header = req.headers.authorization;
        if(!header) return res.status(401).json({ success: false, error: "No token found" });

        const token = header.split(" ")[1];
        const decode = jwt.verify(token, process.env.SecretKey);

        req.userId = decode.id;
        next();
    } catch {
        res.status(401).json({ success: false, error: "Invalid token" });
    }
}

module.exports = authMiddleware;