const { Schema, model, SchemaTypes } = require('mongoose')

const transactionSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Select transaction type'],
    enum: ['income', 'cost'],
  },
  category: {
    type: SchemaTypes.ObjectId,
    ref: 'category',
    default: null
  },
  amount: {
    type: Number,
    min: 0,
    required: [true, 'Enter amount'],
  },
  date: {
    type: Date,
    required: [true, 'Select transaction date'],
  },
  comment: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: null
  },
  balance: {
    type: Number,
    min: 0,
    default: 0
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  }
},
  { versionKey: false, timestamps: true });

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
