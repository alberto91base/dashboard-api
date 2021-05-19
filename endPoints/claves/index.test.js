const request = require('supertest');
const faker = require('faker');

describe('Server slowCam', () => {
    let app;
    beforeAll(async () => {
        app = require('../../server');
    });

    afterAll((done) => {
        return new Promise((resolve, reject) => {
            app.close((err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    it('should Execute POST and save', async () => {
        const claves = await request(app)
            .post('/olympic/claves/')
            .send({
                title: '¿Qué ha hecho Gómez Noya para merecer esto?',
                description: '',
                absoluteUrl: 'http://google.es',
                published: true,
                date: '2016/08/03',
                image: {
                    src: '57a22ec85c69e-JJ.png',
                    alternativeText: 'Gómez Noya, en una imagen de archivo',
                },
                sports: ['Triatlón'],
            })
            .set('AUTH', 'dfdf')
            .set('Content-Type', 'application/json');
        //console.log(claves);
        expect(claves.statusCode).toEqual(201);
    });
});
