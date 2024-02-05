// import basic modules
const express = require("express");
const api = require("./routes/api.route");
const dotenv = require("dotenv");
const viewEngine = require("./routes/viewEngine.route");

// import middleware & routers
const loggerMW = require("./src/middleware/logger");
const notFoundMW = require("./src/middleware/404");
const errorMW = require("./src/middleware/error");
const uploadRoute = require("./routes/upload.route");

// init process env
dotenv.config();

// create app
const app = express();

// activate templates
app.set("view engine", "ejs");

// activate middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", loggerMW);
app.use("/", errorMW);
app.use("/", viewEngine);
app.use("/api", api);
app.use("/upload", uploadRoute);
app.use("/public/books/", express.static(__dirname + "/public/books/"));

const authResBody = {
  id: 1,
  mail: "test@mail.ru",
};

app.use(notFoundMW);

const PORT = process.env.PORT || 3000;
app.listen(PORT) && console.log(`listening on http://localhost:${PORT}`);
