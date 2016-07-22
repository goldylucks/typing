const expect = require('chai').expect;
const request = require('supertest-as-promised');
const _ = require('lodash');
const server = require('../../server.js');
const app = request(server);
const seedData = require('../../utils/seed.json');

describe('api/texts', () => {
  const BASE_URL = '/api/texts';
  let seedTexts;
  let seedUsers;
  let adam;
  let eve;

  beforeEach('refresh data', () => {
    seedTexts = _.cloneDeep(seedData.texts);
    seedUsers = _.cloneDeep(seedData.users);
    adam = seedUsers[0];
    eve = seedUsers[1];
  });

  describe('getOne', () => {
    it('should get my private text', done => {
      const _text = seedTexts[0];
      app
        .get(`${BASE_URL}/${_text._id}`)
        .set('Authorization', 'Bearer ' + adam.token)
        .then(res => {
          const text = res.body;
          expect(text.title).to.equal(_text.title);
          expect(text.body).to.equal(_text.body);
          expect(text._id).to.equal(_text._id);
          expect(text.public).to.equal(false);
          expect(text.userId).to.equal(adam._id);
          done();
        });
    });
    it('should get my public text', done => {
      const _text = seedTexts[1];
      app
        .get(`${BASE_URL}/${_text._id}`)
        .set('Authorization', 'Bearer ' + adam.token)
        .then(res => {
          const text = res.body;
          expect(text.title).to.equal(_text.title);
          expect(text.body).to.equal(_text.body);
          expect(text._id).to.equal(_text._id);
          expect(text.public).to.equal(true);
          expect(text.userId).to.equal(adam._id);
          done();
        });
    });
    it('should NOT get eve`s PRIVATE text', done => {
      const _text = seedTexts[2];
      app
        .get(`${BASE_URL}/${_text._id}`)
        .set('Authorization', 'Bearer ' + adam.token)
        .then(res => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.undefined;
          done();
        });
    });
    it('should get eve`s public text', done => {
      const _text = seedTexts[3];
      app
        .get(`${BASE_URL}/${_text._id}`)
        .set('Authorization', 'Bearer ' + adam.token)
        .then(res => {
          const text = res.body;
          expect(text.title).to.equal(_text.title);
          expect(text.body).to.equal(_text.body);
          expect(text._id).to.equal(_text._id);
          expect(text.public).to.equal(true);
          expect(text.userId).to.equal(eve._id);
          done();
        });
    });
  });

  describe('get', () => {
    it('should return my two texts, and eves public text. their title and ids', done => {
      app
        .get(BASE_URL)
        .set('Authorization', 'Bearer ' + adam.token)
        .then(res => {
          const texts = res.body;
          expect(texts).to.be.an('array');
          expect(texts).to.have.length.equal(3);
          texts.each(t => {
            expect(t.title).to.be.a('string');
            expect(t._id).to.be.a('string');
            expect(t.body).to.be.undefined;
            expect(t.userId).to.be.undefined;
          });
          done();
        });
    });
  });

  describe('post', () => {
    const title = 'Test title';
    const body = 'Test body';

    it('should post a text', done => {
      app
        .post(BASE_URL)
        .set('Authorization', 'Bearer ' + adam.token)
        .send({ body, title })
        .then(res => {
          expect(res.status).to.equal(201);
          const text = res.body;
          console.log('******************');
          console.log(text);
          console.log('******************');
          expect(text.title).to.equal(title);
          expect(text.body).to.equal(body);
          expect(text.public).to.equal(true);
          expect(text.userId).to.equal(adam._id);
          expect(text._id).to.not.be.undefined;
          done();
        });
    });
  });
});