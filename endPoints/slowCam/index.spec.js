const slowCamHandler = require('./index');

const common = () => ({
    _id: '2399dsd6dfsl',
    cleanString: {
        clean: jest.fn(),
    },
    cleanObject: {
        clean: jest.fn(),
    },
    converter: {},
});
describe('Endpoints slowCam', () => {
    it('Should return all', async () => {
        const req = {
            params: {},
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        const SlowCam = {
            find: jest.fn(() => {
                return { sort: jest.fn().mockReturnThis() };
            }),
            countFindAll: jest.fn().mockReturnThis(),
        };

        await slowCamHandler({ SlowCam }).get(req, res);

        expect(SlowCam.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
    });

    it('should create', async () => {
        const req = {
            body: common().olympic,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn().mockReturnThis(),
        };

        const SlowCam = {
            create: jest.fn().mockReturnValue({ _id: common()._id }),
        };
        const Vote = {};

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;
        await slowCamHandler({
            SlowCam,
            Vote,
            cleanString,
            cleanObject,
            converter,
        }).post(req, res);

        expect(SlowCam.create.mock.calls.length).toBe(1);
        expect(res.sendStatus.mock.calls).toEqual([[201]]);
    });

    it('Should update when data and id slowCam are correct', async () => {
        const req = {
            params: {
                olympic_id: 1,
            },
            body: {
                user_id: '',
                category_id: '',
                description: '',
                date_init: '',
                date_end: '',
                url: '/url/',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn().mockReturnThis(),
        };

        const SlowCam = {
            findByIdAndUpdate: jest.fn().mockReturnValue([[{ _id: 1 }]]),
        };

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;
        await slowCamHandler({
            SlowCam,
            cleanString,
            cleanObject,
            converter,
        }).put(req, res);

        expect(SlowCam.findByIdAndUpdate.mock.calls.length).toBe(1);
        expect(SlowCam.findByIdAndUpdate.mock.calls).toEqual([
            [
                { _id: req.params.slowCam_id },
                req.body,
                { runValidators: true, new: true, useFindAndModify: false },
            ],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[200]]);
    });

    it('Should return one ranking', async () => {
        const req = {
            params: {
                slowCam_id: common()._id,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn().mockReturnThis(),
        };

        const SlowCam = {
            findSlowCamById: jest.fn().mockReturnValue({ _id: common()._id }),
        };

        await slowCamHandler({ SlowCam }).getOne(req, res);

        expect(SlowCam.findSlowCamById.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[{ _id: common()._id }]]);
    });
});
