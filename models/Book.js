const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pages: Number,
  authorID: String,
});

module.exports = model("Book", bookSchema);
