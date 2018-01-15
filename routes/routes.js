const users = require('./users');
const projects = require('./projects');
const repos = require('./repos');
const auth = require('./auth');

const routes = (app) => {
  // Initialize user routes
  app.use('/api/users', users);

  app.use('/api/projects', projects);
  
  app.use('/api/repos', repos);
  // Init authentication route /auth/me
  auth(app);
};

module.exports = routes;