const { Schema, model, SchemaTypes } = require('mongoose')

const categorySchema = new Schema({
  type: {
    type: String,
    required: [true, 'Select transaction type'],
    enum: ['income', 'cost'],
  },
  name: {
    type: String,
    required: [true, 'Select category name'],
    default: null,
  },
    colour: {
    type: String,
    default: null,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
    default: null
  }
},
  { versionKey: false, timestamps: true })

const Category = model('category', categorySchema)

module.exports = Category
