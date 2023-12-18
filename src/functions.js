const findItem = (index) => {
  const { books } = require("../data-storage/library");
  if (books.findIndex((el) => el.id === index)) {
    return books[index];
  }
  return false;
};

module.exports = { findItem };
