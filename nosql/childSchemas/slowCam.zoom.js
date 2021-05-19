const mongoose = require('mongoose');

const zoomSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imageBg: {
        src: {
            type: String,
        },
        alternativeText: {
            type: String,
        },
    },
    image: {
        src: {
            type: String,
        },
        alternativeText: {
            type: String,
        },
    },
    elements: [
        {
            title: {
                type: String,
            },
            photoDescription: {
                type: String,
            },
            description: {
                type: String,
            },
            paragraph: {
                type: String,
            },
            link: {
                type: String,
            },
            position: {
                x: {
                    type: String,
                },
                y: {
                    type: String,
                },
            },
            image: {
                src: {
                    type: String,
                },
                alternativeText: {
                    type: String,
                },
            },
        },
    ],
});

module.exports = zoomSchema;
