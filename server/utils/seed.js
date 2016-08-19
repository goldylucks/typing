const deasync = require('deasync');
const logger = require('./logger');
const config = require('../config/config');

// models
const Texts = require('../api/texts/textsModel');
const Users = require('../api/users/usersModel');
const History = require('../api/history/historyModel');
const Models = [Texts, Users, History];
const usersService = require('../api/users/usersService');

// data
const seedData = require('./seed.json');
let { texts, users, history } = seedData;

// init
logger.log(`Seeding ${config.env} DB ...`);

module.exports = run();

function run () {
  let ready; // eslint-disable-line no-unmodified-loop-condition
  cleanDB()
    .then(seedUsers)
    .then(seedTexts)
    .then(seedHistory)
    .then(onSeedSuccess)
    .catch(onSeedError)
    .then(() => { ready = true; });

  // make seed sync so test won't run before it is completed
  while (ready === undefined) { // eslint-disable-line no-unmodified-loop-condition
    deasync.sleep(100);
  }
}

function cleanDB () {
  logger.log('Cleaning the DB ...');
  const promises = Models.map(model => model.remove().exec());
  return Promise.all(promises);
}

function seedUsers () {
  logger.log('Seeding users ...');
  var promises = users.map(p => Users.create(p));
  return Promise.all(promises)
          .then(attachTokenToUsers);
}

function seedTexts () {
  logger.log('Seeding texts ...');
  const promises = texts.map(p => Texts.create(p));
  return Promise.all(promises);
}

function seedHistory () {
  logger.log('Seeding history ...');
  const promises = history.map(p => History.create(p));
  return Promise.all(promises);
}

function onSeedSuccess () {
  logger.log('Seeded DB!');
}

function onSeedError (err) {
  logger.error(err);
}

function attachTokenToUsers () {
  users.map(u => {
    u.token = usersService.signToken(u._id);
    return u;
  });
}
