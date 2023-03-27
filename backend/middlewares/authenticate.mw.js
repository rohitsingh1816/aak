const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    //console.log(token);
    if (token) {
        const decoded = jwt.verify(token, process.env.key);
        const userID = decoded.userID;
        req.body.userID = userID;
        if (decoded) {
            next();
        } else {
            res.send("Please Login First");
        }
    } else {
        res.send("Please Login First");
    }
}

module.exports = { authenticate };