module.exports = ({
    SlowCam,
    Claves,
    cleanString,
    cleanObject,
    converter,
}) => ({
    getSlowCam: async (req, res, next) => {
        try {
            const data = await SlowCam.find({
                published: true,
            }).sort({
                date: 1,
            });
            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },

    getClaves: async (req, res, next) => {
        try {
            const data = await Claves.find({
                published: true,
            }).sort({
                date: 1,
            });
            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },
});
