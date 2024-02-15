const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Описание отсутствует",
  },
  authors: {
    type: String,
    default: "Автор не установлен",
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  authors: {
    type: String,
    default: "Автор не установлен",
  },
  fileCover: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
  modified: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Book", bookSchema);
