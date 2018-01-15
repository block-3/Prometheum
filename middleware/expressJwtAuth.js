const expressJwt = require('express-jwt');

// express JWT provides us middleware to validate an authorization token supplied in 'x-auth-token' header
module.exports = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function (req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});