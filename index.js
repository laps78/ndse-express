const express = require("express");
const api = require("./routes/api.route");
const dotenv = require("dotenv");

// activate middleware
const loggerMW = require("./src/middleware/logger");
const notFoundMW = require("./src/middleware/404");
const errorMW = require("./src/middleware/error");
const uploadMW = require("./routes/file.route");

// init process env
dotenv.config();

// create app (router)
const app = express();
app.use(express.json());

//activate middleware
app.use("/", loggerMW);
app.use("/", errorMW);
app.use("/api", api);
app.use("/upload/img/", uploadMW);
app.use("/public/books/", express.static(__dirname + "/public/books/"));

const authResBody = {
  id: 1,
  mail: "test@mail.ru",
};
app.use(notFoundMW);

const PORT = process.env.PORT || 3000;
app.listen(PORT) && console.log(`listening on http://localhost:${PORT}`);
