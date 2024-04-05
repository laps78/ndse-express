const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find().select("-__v");
    res.status(200).json(books);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /`,
      erroe: error,
    });
  }
});

router.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select("-__v");
    res.json(book);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

router.post("/books", async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  });
  try {
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /`,
      erroe: error,
    });
  }
});

router.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  try {
    await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
    res.redirect(`/api/books/${id}`);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

router.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Book.deleteOne({ _id: id });
    res.status(200).json("['ok']: Book delete success");
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

module.exports = router;
