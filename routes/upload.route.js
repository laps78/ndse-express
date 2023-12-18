const express = require("express");
const router = express.Router();
const { books } = require("../data-storage/library");
const addCoverMW = require("../src/middleware/newFile");
const addBookTextMW = require("../src/middleware/newBook");
const { findItem } = require("../src/functions");

router.post("/cover/:id", addCoverMW.single("cover-img"), (req, res) => {
  if (findItem(req.params.id)) {
    if (req.file) {
      const path = "public/img/" + req.file.originalname;
      books[req.params.id].fileCover = path;
      res.json(path);
    }
    res.json("нет обложки");
  }
});

router.post("/file/:id", addBookTextMW.single("book-text"), (req, res) => {
  if (findItem(req.params.id)) {
    if (req.file) {
      const path = "public/books/" + req.file.originalname;
      books[req.params.id].fileName = path;
      return res.json(path);
    }
    res.json("нет файла");
  }
});

module.exports = router;
