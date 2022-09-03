const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {
        return res.status(404).json({
            status: "failure",
            msg: "Token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userID = decoded.userID;
        next();
    } catch (error) {
        return res.status(404).json({
            status: "failure",
            msg: "Invalid Token"
        })
    }
}

module.exports = verifyToken;