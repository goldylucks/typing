// @flow

import deasync from 'deasync'

import serverConfig from '../serverConfig'
// models
import Texts from '../api/texts/textsModel'

// data
import { texts } from './seedData'
import serverLogger from './serverLogger'

const Models = [Texts]

const cleanDB = () => {
  serverLogger.log('Cleaning the DB ...')
  const promises = Models.map(model => model.remove().exec())
  return Promise.all(promises)
}

const seedTexts = () => {
  serverLogger.log('Seeding texts ...')
  const promises = texts.map(t => Texts.create(t))
  return Promise.all(promises)
}

const logSeedSuccess = () => {
  serverLogger.log('Seeded DB!')
}

const logSeedError = err => serverLogger.error('error seeding DB:', err)

const seed = () => {
  serverLogger.log(`Seeding ${serverConfig.env} DB ...`)
  let ready // eslint-disable-line no-unmodified-loop-condition
  cleanDB()
    .then(seedTexts)
    .then(logSeedSuccess)
    .catch(logSeedError)
    .then(() => { ready = true })

  // make seed sync so test won't run before it is completed
  while (ready === undefined) { // eslint-disable-line no-unmodified-loop-condition
    deasync.sleep(100)
  }
}

export default seed
