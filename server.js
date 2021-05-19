const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const configs = require('./configs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
const { body, validationResult } = require('express-validator');

const { _public,slowCam,claves  } = require('./endPoints');
const {
    handlerErrors,
    validationData,
    managerLikes
} = require('./middlewares');
const {
    routerPublic,
    routerSlowCam,
    routerClaves
} = require('./routers');
const { BadRequest } = require('./utils/errors');

const { connectDb, SlowCam, Like, Claves } = require('./nosql');
const { bcryptGenerator, converter } = require('./services');
const cleanString = require('./utils/cleanString');
const cleanObject = require('./utils/cleanObject');

const handlerManagerLikes = managerLikes({
    Like,
});

const publicHandler = _public({ SlowCam,Claves, cleanString, cleanObject, converter });
const slowCamHandler = slowCam({SlowCam,cleanString, cleanObject, converter});
const clavesHandler = claves({Claves,cleanString, cleanObject, converter});

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');

app.use(cors());
app.options('*', cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  '/olympic/slowCam',
  routerSlowCam(
    slowCamHandler,
    handlerErrors,
    jwt,
    cors(configs.corsConfig),
    bcryptGenerator
  )
);


app.use(
  '/olympic/claves',
  routerClaves(
    clavesHandler,
    handlerErrors,
    jwt,
    cors(configs.corsConfig),
    bcryptGenerator
  )
);

app.use(
    '/public/olympic',
    routerPublic(
        publicHandler,
        handlerErrors,
        jwt,
        cors(configs.corsConfig),
        bcryptGenerator
    )
);


app.get('*', function (req, res) {
    res.status(404).send({ error: 'Not found' });
});

const server = app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
);
connectDb().then(async () => {
    console.log('Moongo connect');
});

module.exports = server;
