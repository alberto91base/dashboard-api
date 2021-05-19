const clavesHandler = require('./index');

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
describe('Endpoints claves', () => {
    it('Should return all', async () => {
        const req = {
            params: {},
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        const Claves = {
            find: jest.fn(() => {
                return { sort: jest.fn().mockReturnThis() };
            }),
            countFindAll: jest.fn().mockReturnThis(),
        };

        await clavesHandler({ Claves }).get(req, res);

        expect(Claves.find.mock.calls.length).toBe(1);
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

        const Claves = {
            create: jest.fn().mockReturnValue({ _id: common()._id }),
        };
        const Vote = {};

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;
        await clavesHandler({
            Claves,
            Vote,
            cleanString,
            cleanObject,
            converter,
        }).post(req, res);

        expect(Claves.create.mock.calls.length).toBe(1);
        expect(res.sendStatus.mock.calls).toEqual([[201]]);
    });

    it('Should return one', async () => {
        const req = {
            params: {
                claves_id: common()._id,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn().mockReturnThis(),
        };

        const Claves = {
            findClavesById: jest.fn().mockReturnValue({ _id: common()._id }),
        };

        await clavesHandler({ Claves }).getOne(req, res);

        expect(Claves.findClavesById.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[{ _id: common()._id }]]);
    });
});
