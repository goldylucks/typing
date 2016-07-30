const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const express = require('express');
const app = express();

const config = require('./config/config');
const api = require('./api/api');

mongoose.connect(config.db.url);

// dev/tests
if (config.seed) {
  require('./utils/seed');
}

require('./middlewares/appMiddleware')(app);

app.use('/api', api);

app.use(require('./middlewares/errorMiddleware'));
app.use('/api', require('./middlewares/404Middleware'));
app.use('/', express.static(path.join(__dirname, 'public', 'index.html')));

if (!module.parent) {
  app.listen(config.port);
}

console.log('listening on port ' + config.port);

module.exports = app;
