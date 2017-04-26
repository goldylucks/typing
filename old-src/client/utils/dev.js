global.SHOUT = function SHOUT(...args) {
  console.log('*********************')
  console.log.apply(null, args)
  console.log('*********************')
}
