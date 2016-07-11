var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('../config/config');
var override = require('method-override');

module.exports = function (app) {
  if (config.logging) {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
  app.use(attachTemp);
};

function attachTemp (req, res, next) {
  req.temp = req.temp || {};
  next();
}
