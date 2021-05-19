const express = require('express');
const router = express.Router();

module.exports = (publicHandler, handlerErrors, jwt, cors) => {
    router.get('/slowCam/', publicHandler.getSlowCam, handlerErrors);

    router.get('/claves/', publicHandler.getClaves, handlerErrors);

    return router;
};
