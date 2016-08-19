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
app.use('/api', require('./middlewares/404Middleware'));
app.use('/', express.static(path.join(__dirname, '..', 'build')));
app.use('/nav', express.static(path.join(__dirname, '..', 'build')));
app.use('/texts/:id', express.static(path.join(__dirname, '..', 'build')));
app.use('/add-text', express.static(path.join(__dirname, '..', 'build')));
app.use('/finish/:id', express.static(path.join(__dirname, '..', 'build')));
app.use('/history', express.static(path.join(__dirname, '..', 'build')));
app.use(require('./middlewares/errorMiddleware'));

if (!module.parent) {
  app.listen(config.port);
}

console.log('listening on port ' + config.port);

module.exports = app;
