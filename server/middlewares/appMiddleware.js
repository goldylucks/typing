const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config/config');
const override = require('method-override');

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
