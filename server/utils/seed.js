const deasync = require('deasync');
const logger = require('./logger');
const config = require('../config/config');

// models
const Texts = require('../api/texts/textsModel');

// data
const seedData = require('./seed.json');
const texts = seedData.texts;

// init
logger.log(`Seeding ${config.env} DB ...`);

module.exports = run();

function run () {
  let ready; // eslint-disable-line no-unmodified-loop-condition
  cleanDB()
    .then(seedTexts)
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
  const promises = [Texts]
    .map(model => model.remove().exec());
  return Promise.all(promises);
}

function seedTexts () {
  logger.log('Seeding texts ...');
  const promises = texts.map(p => Texts.create(p));
  return Promise.all(promises);
}

function onSeedSuccess () {
  logger.log('Seeded DB!');
}

function onSeedError (err) {
  logger.error(err);
}
