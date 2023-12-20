const { Storage } = require("./storage.io");
const storage = new Storage("library");

const findItem = (index) => {
  const books = storage.data;
  const idx = books.findIndex((el) => el.id === index);
  if (idx !== -1) {
    return books[idx];
  }
  return false;
};

module.exports = { findItem };
