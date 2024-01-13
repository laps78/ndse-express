const express = require("express");
const router = express.Router();

const { Book } = require("../src/book");
const { Storage } = require("../src/storage.io");
const storage = new Storage("library");
const books = storage.data;

router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная",
    books: books,
  });
});

router.get("/books", (req, res) => {
  res.render("books/index", {
    title: "Библиотека",
    books: books,
  });
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Добавить книгу",
    book: {},
  });
});

router.get("/update/:id", (req, res) => {
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);
  if (idx === -1) {
    res.redirect("/404");
  }

  res.render("books/update", {
    title: "Библиотека | редактировать книгу",
    book: books[idx],
  });
});

router.post("/create", (req, res) => {
  // TODO этот код можно вынести в functions.js - код функции создание книги
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
  // TODO конец кода функции создания книги

  res.redirect("/");
});

router.post("/updete/:id", (req, res) => {
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
    res.redirect("/");
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
  res.redirect("/");
});

module.exports = router;
