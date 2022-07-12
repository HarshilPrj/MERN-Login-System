const jwt = require("jsonwebtoken");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

module.exports = {
    async verifyToken(req, res) {
        const token = req.cookies.user_token;
        console.log(token);
        if (!token) {
            res.status(401).send("Invalid token");
        }   
        try {
            jwt.verify(token, JWT_SECRET, (error, data) => {
                console.log(data);
            });
        } catch (error) {
            return res.status(401).send({
                error: error.message,
                stack: error.stack,
            });
        }
    },
};


