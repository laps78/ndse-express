const { Book } = require("./book");

const createBook = (data, storage) => {
  const newBook = new Book(
    data.title,
    data.description,
    data.authors,
    data.favorite,
    data.fileCover,
    data.fileName
  );
  storage.addNew(newBook);
};

const updateBook = (data, storage) => {
  /**
   * TODO тут нужно имплементировать функцию/метод
   */
};

module.exports = { createBook, updateBook };
