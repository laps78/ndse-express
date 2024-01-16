const express = require("express");
const router = express.Router();
const Book = require("../src/book");
const { Storage } = require("../src/storage.io");

const { createBook, updateBook } = require("../src/book.mod");
const storage = new Storage("library");

router.use("/books/:id/download", (req, res) => {
  const { id } = req.params;
  const books = storage.data;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    console.log(books[idx].fileName);
    res.download(/*__dirname + */ books[idx].fileName);
  }
});

router.get("/books", (req, res) => {
  const books = storage.data;
  if (books) {
    res.json(books);
  } else {
    res.json("Нет книг");
  }
});

router.get("/books/:id", (req, res) => {
  const books = storage.data;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

router.post("/user", (req, res) => {
  res.status(201);
  res.json(authResBody);
});

router.post("/login", (req, res) => {
  res.status(201);
  res.json(authResBody);
});

router.post("/books/", (req, res) => {
  createBook(req.body);
  res.status(201);
  res.json(newBook);
});

router.put("/books/:id", (req, res) => {
  // TODO это повторяющийся код. Его нужно вынести в functions.js - код функции обновления книги
  const books = storage.data;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    };
    storage.write(books);
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
  // TODO конец кода функции обновления книги
});

router.delete("/books/:id", (req, res) => {
  const books = storage.data;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    storage.write(books);
    res.json("ok");
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

module.exports = router;
