const origins = ["localhost:5173"]
module.exports = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (origins.includes(origin)) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }

}