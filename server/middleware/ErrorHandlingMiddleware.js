function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({ error: err.message });
}

module.exports = errorHandler;
