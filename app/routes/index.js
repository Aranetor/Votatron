const pollRoutes = require('./poll_routes');
const userRoutes = require('./user_routes');

module.exports = function(app, db) {
  pollRoutes(app, db);
  userRoutes(app, db);

  // Other route groups could go here, in the future
};
