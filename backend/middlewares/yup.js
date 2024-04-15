const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body,{abortEarly: false});
        return next();
    } catch (exception) {
        //Remove array index number from yup errors for better readability e.g: items[2] title is required => items title is required
        // return res.status(400).json({ status: 'error', errors: {general: exception.errors[0].replace(/\[(.*?)\]./, ' ')} });
        let errors = {};
        exception.inner.map(item => {
            errors[item.path.replace(/\.(.*?)$/,'')] = item.errors[0].replace(/\[(.*?)\]./, ' ')
        })
        return res.status(400).json({ status: 'error', errors: errors});
    }
};
module.exports = validate