const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/books/");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const allowedTypes = ["text/txt"];
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ fileStorage, fileFilter });
