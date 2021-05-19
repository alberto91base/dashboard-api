const express = require('express');
const router = express.Router();

module.exports = (slowCamHandler, handlerErrors, jwt, cors) => {
    router.get('/', slowCamHandler.get, handlerErrors);

    router.post('/', slowCamHandler.post, handlerErrors);

    router.put('/:slowCam_id', slowCamHandler.put, handlerErrors);

    router.delete('/:slowCam_id', slowCamHandler.delete, handlerErrors);

    router.get('/:slowCam_id', slowCamHandler.getOne, handlerErrors);

    return router;
};
