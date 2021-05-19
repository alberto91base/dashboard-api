const managerLikes = ({ Like }) => ({
    addingLikeDocument: async (req, res, next) => {
        try {
            const data = await req.body.elements.map(async (value, index) => {
                if (!value._id) {
                    let item = value;
                    const likeInserted = await Like.create({});
                    item.likesId = likeInserted._id;
                    return item;
                }

                throw new Error('Specific Validation');
            });
            const result = Promise.all(data);
            req.body.elements = await result;
            next();
        } catch (err) {
            return res.status(err.getCode()).json({
                status: 'error',
                message: err.message,
                type: err.type,
            });
        }
    },
    updatingLikeDocument: async (req, res, next) => {
        try {
            const errorsIfExist = await req.body.elements.map(
                async (value, index) => {
                    if (value._id && value.likesId === undefined) {
                        throw new Error('Specific Validation');
                    }

                    let item = value;
                    return item;
                }
            );
            await Promise.all(errorsIfExist);

            const data = await req.body.elements.map(async (value, index) => {
                if (!value._id) {
                    let item = value;
                    const likeInserted = await Like.create({});
                    item.likesId = likeInserted._id;
                    return item;
                }
                return value;
            });

            const result = Promise.all(data);
            req.body.elements = await result;
            next();
        } catch (err) {
            return res.status(err.getCode()).json({
                status: 'error',
                message: err.message,
                type: err.type,
            });
        }
    },
});

module.exports = managerLikes;
