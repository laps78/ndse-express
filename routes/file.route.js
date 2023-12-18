const express = require("express");
const router = express.Router();
const fileMW = require("../src/middleware/newFile");

router.post("/upload/cover", fileMW.single("cover-img"), (req, res) => {
  if (req.file) {
    const { path } = res.file;
    res.json(path);
  }
  res.json();
});

module.exports = router;
