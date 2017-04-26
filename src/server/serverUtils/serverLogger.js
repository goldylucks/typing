/* eslint-disable */
// no var needed here, colors will attached colors to String.prototype
import 'colors'

import serverConfig from '../serverConfig'

// create a noop (no operation) function for when loggin is disabled
const noop = function () {}
// check if loggin is enabled in the serverConfig
// if it is, then use console.log
// if not then noop
const consoleLog = serverConfig.isLogging ? console.log.bind(console) : noop

const serverLogger = {
  log: function (...args) {
    const tag = '[ ✨ LOG ✨ ]'.green
    args
      .map(function (arg) {
        if (!arg) {
          return tag + '  ' + 'undefined'.gray
        }

        if (typeof arg === 'object') {
          // turn the object to a string so we
          // can log all the properties and color it
          const string = JSON.stringify(arg, null, 2)
          return tag + '  ' + string.cyan
        } else {
          return tag + '  ' + arg.cyan
        }
      })

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args)
  },

  error: function (...args) {
    args
      .map(function (arg) {
        arg = arg.stack || arg
        const name = arg.name || '[ ❌ ERROR ❌ ]'
        const log = name.yellow + '  ' + arg.red
        return log
      })

    consoleLog.apply(console, args)
  },

}

export default serverLogger
