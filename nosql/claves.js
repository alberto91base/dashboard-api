const mongoose = require('mongoose');
const db = mongoose.models;

const clavesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        absoluteUrl: {
            type: String,
        },
        published: {
            type: Boolean,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        image: {
            src: { type: String },
            alternativeText: { type: String },
        },
        sports: {
            type: Array,
        },
    },
    { timestamps: false }
);

clavesSchema.statics.countFindAll = function () {
    return this.countDocuments();
};

clavesSchema.statics.findClavesById = async function (params, next) {
    const data = this.findOne({ _id: params.claves_id });
    return data;
};

const Claves = mongoose.model('Claves', clavesSchema);

module.exports = Claves;
