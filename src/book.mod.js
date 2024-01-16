const { Book } = require("./book");
const { Storage } = require("./storage.io");
const storage = new Storage("library");

const createBook = (data) => {
  /**
   * TODO не определяется состояние чекбокса
   */
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
  /**
   * TODO тут нужно имплементировать функцию/метод
   */
};

module.exports = { createBook, updateBook };
