const expect = require('chai').expect;
const request = require('supertest-as-promised');
const _ = require('lodash');
const server = require('../../server.js');
const app = request(server);

const seedData = require('../../utils/seed.json');

describe('[USERS]', () => {
  const BASE_URL = '/api/users';
  let seedUsers;

  beforeEach('refresh data', () => {
    seedUsers = _.cloneDeep(seedData.users);
  });

  describe('[POST]', () => {
    const name = 'test user';
    const password = 'test password';
    it('should create a user', done => {
      app
        .post(BASE_URL)
        .send({ password, name })
        .then(res => {
          expect(res.status).to.equal(201);
          const user = res.body;
          expect(user.name).to.equal(name);
          expect(user.password).to.be.undefined;
          expect(user.token).to.be.a('string');
          done();
        });
    });
  });

  it('should get a user', done => {
    app
      .get(`${BASE_URL}/${seedUsers[0]._id}`)
      .then(res => {
        const user = res.body;
        expect(user.name).to.equal(seedUsers[0].name);
        expect(user.password).to.be.undefined;
        done();
      });
  });

  describe('[GET]', () => {
    it('should get users', done => {
      app
        .get(BASE_URL)
        .then(res => {
          const users = res.body;
          expect(users).to.be.an('array');
          expect(users).to.have.length.above(1);
          users.forEach(u => expect(u.password).to.be.undefined);
          done();
        });
    });
  });

  describe('[PUT]', () => {
    it('should update a user of it\'s owner', done => {
      const updatedName = 'josh';
      app
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
          done();
        });
    });

    it('should NOT update a user of non owner', done => {
      const adam = seedUsers[0];
      const eve = seedUsers[1];
      app
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
          done();
        });
    });
  });
});
