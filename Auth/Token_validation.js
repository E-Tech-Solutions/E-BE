const jwt = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (!token) {
            return res.json({ Error: "You are not authenticated" });
        } else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.json({ Error: "Token is not correct" });
                } else {
                    req.user_name = decoded.user_name;
                    req.role = decoded.role;
                    req.user_id = decoded.user_id
                    next();
                }
            });
        }
    }
};
