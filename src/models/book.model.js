const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['drama', 'comedy', 'sport'],
    default: 'drama',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

bookSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("book", bookSchema);