const { books } = require("../../data-storage/library");

module.exports = (req, res, next) => {
  const bookIndex = books.findIndex((el) => el.id === req.params.id);
  if (bookIndex !== -1) {
    return bookIndex;
  } else {
    res.statusCode(500);
    res.json("книга не найдена!");
  }
  next();
};
