const { Book } = require("./book");
const { Storage } = require("./storage.io");
const storage = new Storage("./library");
const books = storage.data;

const createBook = (data) => {
  const newBook = new Book(...data);
  storage.addNew(newBook);
};

const updateBook = (data) => {
  /**
   * TODO тут нужно имплементировать функцию/метод
   */
};

module.exports = { createBook, updateBook };