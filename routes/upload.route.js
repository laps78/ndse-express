const express = require("express");
const router = express.Router();
const addCoverMW = require("../src/middleware/newFile");
const addBookTextMW = require("../src/middleware/newBook");
const { findItem } = require("../src/functions");
const { Storage } = require("../src/storage.io");

const books = new Storage("library").data;

router.post("/cover/:id", addCoverMW.single("cover-img"), (req, res, next) => {
  console.log("findItem ", findItem(req.params.id));
  if (findItem(req.params.id)) {
    if (req.file) {
      //console.log(req.file);
      const path = "public/img/" + req.file.originalname;
      console.log(books[req.params.id]);
      console.log("path: ", path);
      books[req.params.id].fileCover = path;
      res.json(path);
    }
    res.json("нет обложки");
  } else {
    res.json("404 | книга не найдена");
  }
});

router.post(
  "/file/:id",
  addBookTextMW.single("book-text"),
  (req, res, next) => {
    if (findItem(req.params.id)) {
      if (req.file) {
        console.log(req.file);
        const path = "public/books/" + req.file.originalname;
        books[req.params.id].fileName = path;
        console.log("path: ", path);
        res.json(path);
      }
      res.json("нет файла");
    }
  }
);

module.exports = router;
