// used also for staging
const productionConfig = {
  isSeeding: process.env.IS_SEEDING || false, // enable for staging app
  isLogging: process.env.IS_LOGGING || false, // enable for staging app
  dbUrl: process.env.MONGODB_URI, // set by heroku's mongo addon
}

export default productionConfig
