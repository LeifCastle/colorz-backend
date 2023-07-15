// import the server
const app = require('../app'); // make the server is exported from app.js
// what's needed for testing
const request = require('supertest');
const expect = require('chai').expect;
// import the modules
const { User } = require('../models');

// import faker
const { faker } = require('@faker-js/faker');
const { createRandomUser } = require('../utils');

/* // test home route
describe('GET /', () => {
    it('returns a 200 response', (done) => {
        request(app).get('/')
        .expect(200, done);
    });
});


// test users
describe('GET /users', () => {
    it('returns a 200 response', (done) => {
        request(app).get('/users')
        .expect(200, done);
    });
    it('returns a user with email', (done) => {
        request(app).get('/users')
        .then(result => {
            console.log('result', result._body.users[0]);
            expect(result._body.users[0]).to.have.property('email');
            done();
        })
    });
    it('should have more than 1 user', (done) => {
        request(app).get('/users')
        .then(result => {
            console.log('result', result._body.users);
            expect(result._body.users.length).to.be.above(1);// expect(10).to.be.above(5);
            done();
        })
    });
});

// test POST route
describe('POST /users/new', () => {
    it('should create a new user and have valid email', (done) => {
        const randomEmail = faker.internet.email();
        request(app).post('/users/new')
        .type('form')
        .send({
            streetAddress: "3560 Becker Burgs",
            city: "Miami",
            state: "Florida",
            zipCode: 98758,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: randomEmail,
            jobTitle: "Systems Engineer",
            birthdate: "1984-02-24T18:11:20.246Z",
            number: "(500) 519-6792",
        })
        .then(response => {
            console.log('new user created', response._body);
            expect(response._body.user.email).to.be.equal(randomEmail);
            done();
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })


    it('returns a 200 response', (done) => {
        const randomEmail = faker.internet.email();
        request(app).post('/users/new')
        .type('form')
        .send({
            streetAddress: "3560 Becker Burgs",
            city: "Miami",
            state: "Florida",
            zipCode: 98758,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: randomEmail,
            jobTitle: "Systems Engineer",
            birthdate: "1984-02-24T18:11:20.246Z",
            number: "(500) 519-6792",
        })
        .expect(200, done);
    })
});

// PUT /users/:id
describe('PUT /users/:id', () => {
    it('should update an existing user phone number', (done) => {
        // create a new user

        let newUser = createRandomUser();
        newUser = { ...newUser, ...newUser.address }
        delete newUser.address;
        request(app).post('/users/new')
        .type('form')
        .send(newUser)
        .then(response => {
            console.log('new user created', response._body);
            const userId = response._body.user._id;
            console.log('--- userId ---', userId);
            const randomNumber = faker.phone.number();
            // Find the new user and update
            request(app).put(`/users/${userId}`)
            .type('form')
            .send({
                number: randomNumber,
            })
            .then(updatedResponse => {
                expect(updatedResponse._body.user.number).to.be.equal(randomNumber);
                done();
            })
            .catch(error => {
                console.log('error', error);
                throw error;
            })
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })


    it('returns a 200 response', (done) => {
        // create a new user
        let newUser = createRandomUser();
        newUser = { ...newUser, ...newUser.address }
        delete newUser.address;
        
        request(app).post('/users/new')
        .type('form')
        .send(newUser)
        .then(response => {
            console.log('new user created', response._body);
            const userId = response._body.user._id;

            console.log('--- userId ---', userId);
            const randomNumber = faker.phone.number();
            // Find the new user and update
            request(app).put(`/users/${userId}`)
            .type('form')
            .send({
                number: randomNumber,
            })
            .expect(200, done);
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })
})

// DELETE
describe('DELETE /users/:id', () => {
    it('returns a 200 response', (done) => {
        // create a new user
        let newUser = createRandomUser();
        newUser = { ...newUser, ...newUser.address }
        delete newUser.address;
        
        request(app).post('/users/new')
        .type('form')
        .send(newUser)
        .then(response => {
            const userId = response._body.user._id;
            // Find the new user and remove
            request(app).delete(`/users/${userId}`)
            .expect(200, done);
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })
}) */

// test themes
describe('GET /themes', () => {
    it('returns a 200 response', (done) => {
        request(app).get('/themes')
        .expect(200, done);
    });
    it('returns a theme with color', (done) => {
        request(app).get('/themes')
        .then(result => {
            console.log('result', result._body.themes[0]);
            expect(result._body.themes[0]).to.have.property('color');
            done();
        })
    });
    it('should have more than 1 theme', (done) => {
        request(app).get('/themes')
        .then(result => {
            console.log('result', result._body.themes);
            expect(result._body.themes.length).to.be.above(1);
            done();
        })
    });
});

// test POST route
describe('POST /themes/new', () => {
    it('should create a new theme and have valid color', (done) => {
        const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        request(app).post('/themes/new')
        .type('form')
        .send({
            color: randomColor,
            height: "200px",
            width: "200px",
            textSize: "16px"
        })
        .then(response => {
            console.log('new theme created', response._body);
            expect(response._body.theme.color).to.be.equal(randomColor);
            done();
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })

    it('returns a 200 response', (done) => {
        const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        request(app).post('/themes/new')
        .type('form')
        .send({
            color: randomColor,
            height: "200px",
            width: "200px",
            textSize: "16px"
        })
        .expect(200, done);
    })
});

// PUT /themes/:id
describe('PUT /themes/:id', () => {
    it('should update an existing theme color', (done) => {
        // create a new theme
        const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        request(app).post('/themes/new')
        .type('form')
        .send({
            color: randomColor,
            height: "200px",
            width: "200px",
            textSize: "16px"
        })
        .then(response => {
            console.log('new theme created', response._body);
            const themeId = response._body.theme._id;
            console.log('--- themeId ---', themeId);
            const newColor = '#'+Math.floor(Math.random()*16777215).toString(16);
            // Find the new theme and update
            request(app).put(`/themes/${themeId}`)
            .type('form')
            .send({
                color: newColor,
            })
            .then(updatedResponse => {
                expect(updatedResponse._body.theme.color).to.be.equal(newColor);
                done();
            })
            .catch(error => {
                console.log('error', error);
                throw error;
            })
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })

    it('returns a 200 response', (done) => {
        // create a new theme
        const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        request(app).post('/themes/new')
        .type('form')
        .send({
            color: randomColor,
            height: "200px",
            width: "200px",
            textSize: "16px"
        })
        .then(response => {
            console.log('new theme created', response._body);
            const themeId = response._body.theme._id;

            console.log('--- themeId ---', themeId);
            const newColor = '#'+Math.floor(Math.random()*16777215).toString(16);
            // Find the new theme and update
            request(app).put(`/themes/${themeId}`)
            .type('form')
            .send({
                color: newColor,
            })
            .expect(200, done);
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })
})

// DELETE
describe('DELETE /themes/:id', () => {
    it('returns a 200 response', (done) => {
        // create a new theme
        const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        request(app).post('/themes/new')
        .type('form')
        .send({
            color: randomColor,
            height: "200px",
            width: "200px",
            textSize: "16px"
        })
        .then(response => {
            const themeId = response._body.theme._id;
            // Find the new theme and remove
            request(app).delete(`/themes/${themeId}`)
            .expect(200, done);
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        })
    })
})


// 