const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed {ARGS[1]} characters.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Email must be valid.'
  })
];

const ageValidator = [
  // TODO: Make some validations here...
];

const genderValidator = [
  // TODO: Make some validations here...
];

// Define the database model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  username: {
    type: String,
    required: [true, 'Name is required.'],
    uniuqe: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: emailValidator
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Password is required.']
  },
  gitlabId: {
    type: Number,
    required: [true, 'GitlabId is required.']
  },
  totalEmber: {
    type: Number
  }
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err);
      }
      else if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        }
        else {
          return callback();
        }
      });
    });
};

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
