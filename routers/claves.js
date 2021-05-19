const express = require('express');
const router = express.Router();

module.exports = (clavesHandler, handlerErrors, jwt, cors) => {
    router.get('/', clavesHandler.get, handlerErrors);

    router.post('/', clavesHandler.post, handlerErrors);

    router.put('/:claves_id', clavesHandler.put, handlerErrors);

    router.delete('/:claves_id', clavesHandler.delete, handlerErrors);

    router.get('/:claves_id', clavesHandler.getOne, handlerErrors);

    return router;
};
