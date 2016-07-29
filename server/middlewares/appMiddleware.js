const bodyParser = require('body-parser');
const config = require('../config/config');
const override = require('method-override');

module.exports = function (app) {
  if (config.logging) {
    app.use(require('morgan')('dev'));
  }
  app.use(cors);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(override());
  app.use(attachTemp);
};

function attachTemp (req, res, next) {
  req.temp = req.temp || {};
  next();
}

function cors (req, res, next) {
  res.header('Access-Control-Allow-Origin', config.appUrl);
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
  next();
}
