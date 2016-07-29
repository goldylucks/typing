global.SHOUT = function SHOUT (...args) {
  console.log('*********************');
  console.log.apply(null, args);
  console.log('*********************');
};

module.exports = {

  logging: true,
  seed: true,

  appUrl: 'http://localhost:3000',

  db: {
    url: 'mongodb://127.0.0.1:27017'
  }
};
