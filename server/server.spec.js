const request = require('supertest-as-promised');
const expect = require('chai').expect;
const server = require('./server');
const app = request(server);
const seedData = require('./utils/seed.json');

describe('server', () => {
  const adam = seedData.users[0];

  afterEach(() => {
    console.log('\n');
  });

  require('../test/dbCleanup');

  it('should return error message according to error middleware', done => {
    app
      .post('/api/texts')
      .set('Authorization', 'Bearer ' + adam.token)
      .then(resp => {
        expect(resp.error.text).to.equal('err: texts validation failed');
        done();
      })
      .catch(err => {
        SHOUT('test err', err);
        done();
      });
  });
});
