const expect = require('chai').expect;
const request = require('supertest-as-promised');
const _ = require('lodash');
const server = require('../../server.js');
const app = request(server);
const seedData = require('../../utils/seed.json');

describe('api/history', () => {
  const BASE_URL = '/api/history';
  let seedHistory;
  let seedTexts;
  let seedUsers;
  let adam;
  let eve;

  beforeEach('refresh data', () => {
    seedHistory = _.cloneDeep(seedData.history);
    seedTexts = _.cloneDeep(seedData.texts);
    seedUsers = _.cloneDeep(seedData.users);
    adam = seedUsers[0];
    eve = seedUsers[1];
  });

  describe('get', () => {
    it('should get my two items', done => {
      const _history = [seedHistory[0], seedHistory[1]];
      app
        .get(BASE_URL)
        .set('Authorization', 'Bearer ' + adam.token)
        .then(res => {
          const history = res.body;
          expect(history).to.have.length(2);
          expect(history[0].text._id).to.equal(_history[0].text);
          expect(history[0].text.title).to.equal(seedTexts[0].title);
          expect(history[0].wpm).to.equal(_history[0].wpm);
          expect(history[0].accuracy).to.equal(_history[0].accuracy);
          expect(history[0].time).to.equal(_history[0].time);
          expect(history[0].createdAt).to.be.a('string');
          expect(history[0].userId).to.equal(adam._id);
          expect(history[1].text._id).to.equal(_history[1].text);
          expect(history[1].text.title).to.equal(seedTexts[1].title);
          expect(history[1].wpm).to.equal(_history[1].wpm);
          expect(history[1].accuracy).to.equal(_history[1].accuracy);
          expect(history[1].time).to.equal(_history[1].time);
          expect(history[1].createdAt).to.be.a('string');
          expect(history[1].userId).to.equal(adam._id);
          done();
        })
        .catch(err => {
          SHOUT('test err', err);
          done();
        });
    });

    it('should get Eve\'s two items', done => {
      const _history = [seedHistory[2], seedHistory[3]];
      app
        .get(BASE_URL)
        .set('Authorization', 'Bearer ' + eve.token)
        .then(res => {
          const history = res.body;
          expect(history).to.have.length(2);
          expect(history[0].text._id).to.equal(_history[0].text);
          expect(history[0].wpm).to.equal(_history[0].wpm);
          expect(history[0].accuracy).to.equal(_history[0].accuracy);
          expect(history[0].createdAt).to.be.a('string');
          expect(history[0].time).to.equal(_history[0].time);
          expect(history[0].userId).to.equal(eve._id);
          expect(history[1].text._id).to.equal(_history[1].text);
          expect(history[1].wpm).to.equal(_history[1].wpm);
          expect(history[1].accuracy).to.equal(_history[1].accuracy);
          expect(history[1].time).to.equal(_history[1].time);
          expect(history[1].createdAt).to.be.a('string');
          expect(history[1].userId).to.equal(eve._id);
          done();
        })
        .catch(err => {
          SHOUT('test err', err);
          done();
        });
    });
  });

  // TODO [AdGo] - res is an empty string
  describe('getByText', () => {
    it('should get the history of my first text, private', done => {
      const text = seedTexts[0];
      const _history = seedHistory[0];
      app
        .get(`${BASE_URL}/getByText/${text._id}`)
        .set('Authorization', `Bearer ${adam.token}`)
        .then(res => {
          const history = res.body;
          expect(history).to.have.length(1);
          expect(history[0].text._id).to.equal(_history.text);
          expect(history[0].text.title).to.equal(text.title); // populated from text
          expect(history[0].wpm).to.equal(_history.wpm);
          expect(history[0].time).to.equal(_history.time);
          expect(history[0].accuracy).to.equal(_history.accuracy);
          expect(history[0].createdAt).to.be.a('string');
          expect(history[0].userId).to.equal(adam._id);
          done();
        })
        .catch(err => {
          SHOUT('test err', err);
          done();
        });
    });

    it('should get the history of eve\'s second text, public', done => {
      const _text = seedTexts[3];
      const _history = seedHistory[3];
      app
        .get(`${BASE_URL}/getByText/${_text._id}`)
        .set('Authorization', `Bearer ${eve.token}`)
        .then(res => {
          const history = res.body;
          expect(history).to.have.length(1);
          expect(history[0].text._id).to.equal(_history.text);
          expect(history[0].text.title).to.equal(_text.title); // populated from text
          expect(history[0].wpm).to.equal(_history.wpm);
          expect(history[0].time).to.equal(_history.time);
          expect(history[0].accuracy).to.equal(_history.accuracy);
          expect(history[0].createdAt).to.be.a('string');
          expect(history[0].userId).to.equal(eve._id);
          done();
        })
        .catch(err => {
          SHOUT('test err', err);
          done();
        });
    });
  });

  describe('post', () => {
    it('should post an item with my results of the first text', done => {
      const wpm = 50;
      const accuracy = 87;
      const text = seedTexts[0];
      const time = 100;
      app
        .post(BASE_URL)
        .set('Authorization', `Bearer ${adam.token}`)
        .send({ wpm, accuracy, time, text: text._id })
        .then(res => {
          expect(res.status).to.equal(201);
          const text = res.body;
          expect(text._id).to.be.a('string');
          done();
        })
        .catch(err => {
          SHOUT('test err', err);
          done();
        });
    });
  });
});
