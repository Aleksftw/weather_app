'use strict';

function errorMiddleware(err, req, res, next) {
    res.status(400).send({error: err._message});
}

exports = module.exports = errorMiddleware;