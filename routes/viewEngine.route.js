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

module.exports = router;
