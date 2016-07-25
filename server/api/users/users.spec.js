const expect = require('chai').expect;
const request = require('supertest-as-promised');
const _ = require('lodash');
const server = require('../../server.js');
const app = request(server);

const seedData = require('../../utils/seed.json');

describe('api/users', () => {
  const BASE_URL = '/api/users';
  let seedUsers;

  beforeEach('refresh data', () => {
    seedUsers = _.cloneDeep(seedData.users);
  });

  describe('post', () => {
    const name = 'test user';
    const password = 'test password';
    const email = 'test@email.com';
    it('should create a user', () => {
      return app
        .post(BASE_URL)
        .send({ password, name, email })
        .then(res => {
          expect(res.status).to.equal(201);
          const user = res.body;
          expect(user.name).to.equal(name);
          expect(user.password).to.be.undefined;
          expect(user.token).to.be.a('string');
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });
  });

  describe('getOne', () => {
    xit('should get a user', () => {
      return app
        .get(`${BASE_URL}/${seedUsers[0]._id}`)
        .then(res => {
          const user = res.body;
          expect(user.name).to.equal(seedUsers[0].name);
          expect(user.password).to.be.undefined;
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });
  });

  describe('login', () => {
    it('should return unmatch on non existing email', () => {
      const email = 'notexisting@gmail.com';
      const password = 'irrelevant';
      return app
        .post(`${BASE_URL}/login`)
        .send({ email, password })
        .then(res => {
          expect(res.status).to.equal(404);
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });

    it('should return unmatch on bad password', () => {
      const adam = seedUsers[0];
      const email = adam.email;
      const password = 'irrelevant';
      return app
        .post(`${BASE_URL}/login`)
        .send({ email, password })
        .then(res => {
          expect(res.status).to.equal(404);
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });

    it('should return adam', () => {
      const adam = seedUsers[0];
      const { email, password } = adam;
      return app
        .post(`${BASE_URL}/login`)
        .send({ email, password })
        .then(res => {
          const user = res.body;
          expect(user.email).to.equal(adam.email);
          expect(user._id).to.equal(adam._id);
          expect(user.password).to.be.undefined;
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });
  });

  describe('get', () => {
    xit('should get users', () => {
      return app
        .get(BASE_URL)
        .then(res => {
          const users = res.body;
          expect(users).to.be.an('array');
          expect(users).to.have.length.above(1);
          users.forEach(u => expect(u.password).to.be.undefined);
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });
  });

  describe('put', () => {
    xit('should update a user of it\'s owner', () => {
      const updatedName = 'josh';
      return app
        .put(BASE_URL + '/' + seedUsers[1]._id)
        .set('Authorization', 'Bearer ' + seedUsers[1].token)
        .send({ 'name': updatedName })
        .then(res => {
          expect(res.body.ok).to.equal(1);
          return app
                  .get(BASE_URL + '/' + seedUsers[1]._id);
        })
        .then(res => {
          expect(res.body.name).to.equal(updatedName);
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });

    xit('should NOT update a user of non owner', () => {
      const adam = seedUsers[0];
      const eve = seedUsers[1];
      return app
        .put(BASE_URL + '/' + adam._id)
        .set('Authorization', 'Bearer ' + eve.token)
        .send({ 'name': 'not adam' })
        .then(res => {
          expect(res.status).to.equal(401);
          return app
                  .get(BASE_URL + '/' + adam._id);
        })
        .then(res => {
          expect(res.body.name).to.equal(adam.name);
        })
        .catch(err => {
          SHOUT('err', err);
          expect('error in async').to.be.true; // fail test on exception
        });
    });
  });
});
