const User = require('../models/user');
const authenticate = require('../middleware/expressJwtAuth');

const getCurrentUser = function (req, res, next) {
  User.findById(req.auth.id, function (err, user) {
    if (err) {
      next(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};

const getOne = function (req, res) {
  const user = req.user.toObject();

  res.json(user);
};

function authRoutes(app) {
  // Returns current user or throws error if no one is logged in
  app.get('/auth/me', authenticate, getCurrentUser, getOne);

}

module.exports = authRoutes;