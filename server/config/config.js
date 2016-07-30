const _ = require('lodash');

const config = {

  dev: 'development',
  test: 'testing',
  prod: 'production',
  secrets: {
    jwt: process.env.JWT_SECRET || 'JWT_SECRET'
  },

  sysPassword: process.env.SYS_PASSWORD || 'sysPass',

  port: process.env.PORT || 3000

};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;
const envConfig = require(`./${config.env}`);

module.exports = _.merge(config, envConfig);
