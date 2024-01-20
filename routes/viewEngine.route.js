const express = require("express");
const router = express.Router();

const formMulter = require("../src/middleware/uploadFromFormMW");

const { Storage } = require("../src/storage.io");
const { createBook, updateBook } = require("../src/book.mod");

router.use((req, res, next) => {
  const storage = new Storage("library");
  setTimeout(() => {
    req.storage = storage;
    next();
  }, 1000);
});

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная",
  });
});

router.get("/books", (req, res) => {
  res.render("books/index", {
    title: "Библиотека",
    books: req.storage.data,
  });
});

router.get("/books/:id", (req, res) => {
  const books = req.storage.data;
  const idx = books.findIndex((elem) => elem.id === req.params.id);
  if (idx !== -1) {
    res.render("books/view", {
      book: books[idx],
    });
  } else {
    res.json("404 | книга не найдена");
  }
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Добавить книгу",
    book: {},
    action: "/create",
  });
});

router.get("/books/update/:id", (req, res) => {
  const { id } = req.params;
  const books = req.storage.data;
  const idx = books.findIndex((el) => el.id === id);
  if (idx === -1) {
    res.redirect("/404");
  }

  res.render("books/update", {
    title: "Библиотека | редактировать книгу",
    action: `/books/update/${id}`,
    book: books[idx],
  });
});

router.post("/create", formMulter, (req, res) => {
  createBook(req.body, req.storage);
  res.redirect("/books");
});

router.post("/books/update/:id", formMulter, (req, res) => {
  /** TODO inspect folowing method!
   *
   */
  const { id } = req.params;
  const books = req.storage.data;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;
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

    res.redirect("/books");
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

router.post("/books/delete/:id", (req, res) => {
  const books = req.storage.data;
  const idx = books.findIndex((el) => el.id === req.params.id);
  if (idx !== -1) {
    books.splice(idx, 1);
    req.storage.write(books);
    res.status(200);
    res.redirect("/books");
  } else {
    res.status(404);
    res.json("404 | книга не найдена");
  }
});

module.exports = router;
