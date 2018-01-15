const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');
const gitlab = require('../config/gitlab');
const User = require('../models/user');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/expressJwtAuth');

// Authentication process: when a successful login occurs, create a jwt (json web token) (using expressJwtAuth middleware)
// and send back the jwt as a response header ('x-auth-token'). On the front end, store this token localStorage, and then we can
// authenticate certain requests by supplying this header (x-auth-token) using the stored token on subsequent requests

const createToken = (auth) => {
  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: '7d'
  });
};

const generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  next();
};


const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};

// READ (ONE)
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'No such user.' });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/register', (req, res, next) => {
  console.log('REGISTERRR');
  console.log(req.body);

  let userData = {
    name: sanitizeName(req.body.name),
    email: sanitizeEmail(req.body.email),
    username: req.body.username,
    password: req.body.password
  };

  gitlab.users.create(userData).then(u => {
    console.log('GITLAB ID');
    console.log(u.id);
    userData.gitlabId = u.id;
    const newUser = new User(userData);
    newUser.save(function (error, user) {
      if (error) {
        console.log(error);
      }
      else {
        req.auth = {
          id: user._id
        };
        next();
        //res.status(200).json({ success: true, userId: user._id });
      }
    });
  });
}, generateToken, sendToken);

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      res.status(401).json({ success: false, msg: 'Wrong username or password' });
    }
    else {
      req.session.userId = user._id;

      req.auth = {
        id: user._id
      };
      next();
    }
  });
}, generateToken, sendToken);

// LOGOUT

router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        res.status(400).json({ success: false });
      }
      else {
        res.status(200).json({ success: true });
      }
    });
  }
});

// UPDATE
router.put('/:id', (req, res) => {

  let updatedUser = {
    name: sanitizeName(req.body.name),
    email: sanitizeEmail(req.body.email),
  };

  User.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      User.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: 'Successfully updated!',
            result: {
              _id: newResult._id,
              name: newResult.name,
              email: newResult.email,
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.email) {
          res.status(400).json({ success: false, msg: err.errors.email.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: 'It has been deleted.',
        result: {
          _id: result._id,
          name: result.name,
          email: result.email
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
};
sanitizeEmail = (email) => {
  return email.toLowerCase();
};
