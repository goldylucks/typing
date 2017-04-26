import developmentConfig from './development'
import productionConfig from './production'
import testingConfig from './testing'

const config = {
  jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET',
  sysPassword: process.env.SYS_PASSWORD || 'SYS_PASSWORD',
  env: process.env.NODE_ENV || 'development',
}

// jest sets NODE_ENV to test automatically. This normalises the .env to require the right file name
if (config.env === 'test') config.env = 'testing'

let envSpecificConfig
if (config.env === 'development') envSpecificConfig = developmentConfig
if (config.env === 'production') envSpecificConfig = productionConfig
if (config.env === 'testing') envSpecificConfig = testingConfig

export default Object.assign(config, envSpecificConfig)
