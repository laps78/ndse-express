const express = require("express");
const router = express.Router();
const addCoverMW = require("../middleware/newCover");
const addBookTextMW = require("../middleware/newBook");
const { findItem } = require("../functions");
const { Storage } = require("../storage.io");

router.post("/cover/:id", addCoverMW.single("cover-img"), (req, res) => {
  if (findItem(req.params.id)) {
    const storage = new Storage("library");
    const books = storage.data;
    const idx = books.findIndex((el) => el.id === req.params.id);
    if (req.file) {
      const path = "public/img/" + req.params.id + "-" + req.file.originalname;
      books[idx].fileCover = path;
      storage.write(books);
      return res.json(path);
    }
    res.json("нет обложки");
  } else {
    res.statusCode(404);
    res.json("404 | книга не найдена");
  }
});

router.post("/file/:id", addBookTextMW.single("book-text"), (req, res) => {
  if (findItem(req.params.id)) {
    const storage = new Storage("library");
    const books = storage.data;
    const idx = books.findIndex((el) => el.id === req.params.id);
    if (req.file) {
      const path =
        "public/books/" + req.params.id + "-" + req.file.originalname;
      books[idx].fileName = path;
      storage.write(books);
      return res.json(path);
    }
    res.json("нет файла");
  } else {
    res.statusCode(404);
    res.json("404 | книга не найдена");
  }
});

module.exports = router;
