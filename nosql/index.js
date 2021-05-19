const mongoose = require('mongoose');

const SlowCam = require('./slowCam');
const Like = require('./like');
const Claves = require('./claves');

const { DATABASE_URL } = process.env;
const connectDb = () => {
    return mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};

module.exports = {
    connectDb,
    SlowCam,
    Like,
    Claves,
};
