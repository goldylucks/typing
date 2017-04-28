// @flow

const developmentConfig = {
  isLogging: true,
  isSeeding: true,
  dbUrl: 'mongodb://localhost/typing_dev',
  port: process.env.SERVER_PORT || '8000',
}

export default developmentConfig
