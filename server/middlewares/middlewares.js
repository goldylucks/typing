module.exports = app => {
  require('./appMiddleware')(app);
  app.use(require('./errorMiddleware'));
  app.use(require('./404Middleware'));
  app.use(require('./usersMiddleware'));
};
