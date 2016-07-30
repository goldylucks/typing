const bodyParser = require('body-parser');
const config = require('../config/config');
const override = require('method-override');

module.exports = function (app) {
  if (config.logging) {
    app.use(require('morgan')('dev'));
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(override());
  app.use(attachTemp);
};

function attachTemp (req, res, next) {
  req.temp = req.temp || {};
  next();
}
