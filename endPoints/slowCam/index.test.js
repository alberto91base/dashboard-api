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
        const slowCam = await request(app)
            .post('/olympic/slowCam/')
            .send({
                title: 'Title',
                description: 'description',
                url: 'url',
                link: 'http://google.es',
                linkName: 'Vídeo del ejercicio completo',
                published: true,
                shortText: 'Title',
                sideText: 'sidetext',
                date: '5/5/5',
                imageH1: {
                    src: '/image/j.png',
                    alternativeText: 'Alternative text',
                },
                imageBackground: {
                    src: '/image/j.png',
                    alternativeText: 'Alternative text',
                },
                imageBackgroundFinal: {
                    src: '/image/j.png',
                    alternativeText: 'Alternative text',
                },
                sports: ['Gimnasia rítmica'],
                elements: [
                    {
                        title: 'Perfecta sincronía',
                        description: 'conjunto',
                        image: 'tramo1.png',
                        frames: [
                            {
                                image: '57b8fd15a761e-1-1-01.png',
                            },
                        ],
                    },
                    {
                        title: 'Perfecta sincronía2',
                        description: 'conjunto2',
                        image: 'tramo1.png',
                        frames: [
                            {
                                image: '57b8fd15a761e-1-1-02.png',
                            },
                        ],
                        zoom: [
                            {
                                title: '',
                                description: '',
                                imageBg: {
                                    src: 'public/modules/zoom/media/image/',
                                    alternativeText: 'some text alt',
                                },
                                image: {
                                    src: 'public/modules/zoom/media/image/',
                                    alternativeText: 'some text alt',
                                },
                                elements: [
                                    {
                                        title: '',
                                        photoDescription: '',
                                        description: '',
                                        paragraph: '',
                                        link: '',
                                        position: {
                                            x: 0,
                                            y: 0,
                                        },
                                        image: {
                                            src: 'Dry/chocolate.png',
                                            alternativeText:
                                                'The explosion of the issue has tantra, but not everyone realizes it.',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
                metadata: {
                    title: 'rrss  title',
                    keywords: 'rrss keywords',
                    rrss: [
                        {
                            social: 'facebook',
                            textToShare: 'Mysterious particles, to the cosmos.',
                            image: '/img/jpg',
                            image_alternativeText: 'Cur ausus messis?',
                        },
                    ],
                },
            })
            .set('AUTH', 'dfdf')
            .set('Content-Type', 'application/json');
        //console.log(slowCam);
        expect(slowCam.statusCode).toEqual(201);
    });
});
