const { books } = require("../data-storage/library");

const findItem = (index) => {
  const idx = books.findIndex((el) => el.id === index);
  if (idx !== -1) {
    return books[idx];
  }
  return false;
};

module.exports = { findItem };
