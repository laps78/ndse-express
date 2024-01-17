const { Book } = require("./book");
const { Storage } = require("./storage.io");

const createBook = (data) => {
  const storage = new Storage("library");

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

const updateBook = (data) => {
  const storage = new Storage("library");
  /**
   * TODO тут нужно имплементировать функцию/метод
   */
};

module.exports = { createBook, updateBook };
