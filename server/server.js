var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var express = require('express');
var app = express();

var config = require('./config/config');
var api = require('./api/api');

mongoose.connect(config.db.url);

// dev/tests
if (config.seed) {
  require('./utils/seed');
}

require('./middlewares/appMiddleware')(app);

app.use('/api', api);

app.use(require('./middlewares/errorMiddleware'));
app.use(require('./middlewares/404Middleware'));

app.listen(config.port);
console.log('listening on port ' + config.port);
