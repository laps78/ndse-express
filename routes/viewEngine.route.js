const express = require("express");
const router = express.Router();

const { Book } = require("../src/book");
const { Storage } = require("../src/storage.io");
const storage = new Storage("library");
const books = storage.data;

router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная",
  });
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Добавить книгу",
  });
});

router.post("/create", (req, res) => {
  const { title, description } = req.body;
  const newBook = new Book(title, description);
  storage.write(newBook);
});
module.exports = router;
