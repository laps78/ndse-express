const express = require("express");
const router = express.Router();
const { Storage } = require("../storage.io");

const { createBook, updateBook } = require("../book.mod");

router.use((req, res, next) => {
  const storage = new Storage("library");
  setTimeout(() => {
    req.storage = storage;
    next();
  }, 1000);
});

router.use("/books/:id/download", (req, res) => {
  const { id } = req.params;
  const books = req.storage.data;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    console.log(books[idx].fileName);
    res.download(/*__dirname + */ books[idx].fileName);
  }
});

router.get("/books", (req, res) => {
  const books = req.storage.data;
  if (books) {
    res.json(books);
  } else {
    res.json("Нет книг");
  }
});

router.get("/books/:id", (req, res) => {
  const books = req.storage.data;
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
  createBook(req.body, req.storage);
  res.status(201);
  res.json(newBook);
});

router.put("/books/:id", (req, res) => {
  const books = req.storage.data;
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
    req.storage.write(books);
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

router.delete("/books/:id", (req, res) => {
  const books = req.storage.data;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    req.storage.write(books);
    res.json("ok");
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

module.exports = router;
