const jwt = require('jsonwebtoken');
const {lang} = require("../locales/messages");
function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization');
        if (!token) {
            throw Error()
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.id = decoded.id;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ status:'error', errors: {general : lang('AccessDenied')} });
    }
};

module.exports = verifyToken;