const express = require("express");
const router = express.Router();

const addCoverMW = require("../src/middleware/newCover");
const addBookTextMW = require("../src/middleware/newBook");

const { Book } = require("../src/book");
const { Storage } = require("../src/storage.io");
const { findItem } = require("../src/functions");
const { createBook, updateBook } = require("../src/book.mod");

const storage = new Storage("library");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная",
  });
});

router.get("/books", (req, res) => {
  res.render("books/index", {
    title: "Библиотека",
    books: storage.data,
  });
});

router.get("/books/:id", (req, res) => {
  const idx = storage.data.findIndex((elem) => elem.id === req.params.id);
  if (idx !== -1) {
    res.render("books/view", {
      book: storage.data[idx],
    });
  } else {
    res.json("404 | книга не найдена");
  }
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Добавить книгу",
    book: {},
  });
});

router.get("/books/update/:id", (req, res) => {
  const { id } = req.params;
  const books = storage.data;
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
  console.log("req.body: ", req.body);
  createBook(req.body);
  res.redirect("/books");
});

router.post(
  "/books/update/:id",
  addCoverMW.single("cover-img"),
  addBookTextMW.single("book-text"),
  (req, res) => {
    /** TODO inspect folowing method!
     *
     * - возможно, стоит поиск производить через findItem()?
     * - код воще не протестирован
     * - не отрабатываются файлы обложки и книги
     * - ваще неясно, что приходит в body запроса
     * - ...
     */
    const { id } = req.params;
    const books = storage.data;
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
      storage.write(books);

      res.redirect("/");
    } else {
      res.status(404);
      res.json("404 | книга не найдена");
    }
  }
);

router.post("/books/delete/:id", (req, res) => {
  const books = storage.data;
  const idx = books.findIndex((el) => el.id === req.params.id);
  if (idx !== -1) {
    books.splice(idx, 1);
    storage.write(books);
    res.status(200);
    res.redirect("/books");
  } else {
    res.statusCode(404);
    res.json("404 | книга не найдена");
  }
});

module.exports = router;
