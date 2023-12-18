const express = require("express");
const router = express.Router();
const Book = require("./src/book");
const library = require("./data-storage/library");

router.get("/api/books", (req, res) => {
  const { books } = library;
  res.json(books);
});

router.get("/api/books/:id", (req, res) => {
  const { books } = library;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

router.post("/api/user", (req, res) => {
  res.status(201);
  res.json(authResBody);
});

router.post("/login", (req, res) => {
  res.status(201);
  res.json(authResBody);
});

router.post("/api/books/", (req, res) => {
  const { books } = library;
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
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

router.put("/api/books/:id", (req, res) => {
  const { books } = library;
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

router.delete("/api/books/:id", (req, res) => {
  const { books } = library;
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
