const express = require("express");
const router = express.Router();
const Book = require("../src/book");
const { Storage } = require("../src/storage.io");

const storage = new Storage("library");

router.use("/books/:id/download", (req, res) => {
  const { id } = req.params;
  const books = storage.data;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    res.download(
      express.static(__dirname + "/public/books/" + books[idx].fileName)
    );
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
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  storage.addNew(newBook);

  res.status(201);
  res.json(newBook);
});

router.put("/books/:id", (req, res) => {
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

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

router.delete("/books/:id", (req, res) => {
  const books = storage.data;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

module.exports = router;
