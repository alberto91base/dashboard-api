const mongoose = require('mongoose');
const db = mongoose.models;
const zoomSchema = require('./childSchemas/slowCam.zoom');

const slowCamSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        url: {
            type: String,
        },
        link: {
            type: String,
        },
        linkName: {
            type: String,
        },
        published: {
            type: Boolean,
        },
        shortText: {
            type: String,
        },
        sideText: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        imageH1: {
            src: { type: String },
            alternativeText: { type: String },
        },
        imageBackground: {
            src: { type: String },
            alternativeText: { type: String },
        },
        imageBackgroundFinal: {
            src: { type: String },
            alternativeText: { type: String },
        },
        sports: {
            type: Array,
        },
        elements: [
            {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
                image: {
                    type: String,
                },
                frames: [
                    {
                        image: {
                            type: String,
                        },
                    },
                ],
                zoom: [zoomSchema],
            },
        ],
        metadata: {
            title: { type: String },
            keywords: { type: String },
            rrss: [
                {
                    social: { type: String },
                    textToShare: { type: String },
                    image: { type: String },
                    image_alternativeText: { type: String },
                },
            ],
        },
    },
    { timestamps: false }
);

slowCamSchema.statics.countFindAll = function () {
    return this.countDocuments();
};

slowCamSchema.statics.findSlowCamById = async function (params, next) {
    const data = this.findOne({ _id: params.slowCam_id });
    return data;
};

const SlowCam = mongoose.model('SlowCam', slowCamSchema);

module.exports = SlowCam;
