module.exports = ({ SlowCam, cleanString, cleanObject, converter }) => ({
    get: async (req, res, next) => {
        try {
            const data = await SlowCam.find({}).sort({
                date: 1,
            });
            const count = await SlowCam.countFindAll();
            const response = {
                total: count,
                data: data,
            };
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    },
    post: async (req, res, next) => {
        try {
            const data = await SlowCam.create(req.body);
            if (Object.keys(data).length !== 0) {
                return res.sendStatus(201);
            }
            res.sendStatus(400);
        } catch (err) {
            next(err);
        }
    },
    put: async (req, res, next) => {
        try {
            const data = await SlowCam.findByIdAndUpdate(
                { _id: req.params.slowCam_id },
                req.body,
                { runValidators: true, new: true, useFindAndModify: false }
            );
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            await SlowCam.deleteOne({ _id: req.params.slowCam_id });
            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await SlowCam.findSlowCamById(req.params);
            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },
});
