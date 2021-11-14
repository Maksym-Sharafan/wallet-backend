const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  name: {
    type: String,
    default: 'Guest'
  },
  balance: {
    type: Number,
    min: 0,
    default: 0
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

const joiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string()
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchema
}
