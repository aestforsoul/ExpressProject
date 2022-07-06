const errorHandler = (err, req, res, next) => {
    if(err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    res.sendStatus(500);
}

module.exports = errorHandler;