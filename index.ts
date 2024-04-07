// import basic modules
import express from "express";
import mongoose from "mongoose";
import newApiDB from "./routes/newApiDB.route";
const apiOld = require("./routes/api.route");
import dotenv from "dotenv";
const viewEngine = require("./routes/viewEngine.route");

// import middleware & routers
const loggerMW = require("./src/middleware/logger");
const notFoundMW = require("./src/middleware/404");
const errorMW = require("./src/middleware/error");
const uploadRoute = require("./routes/upload.route");

// init env
dotenv.config();
const PORT = process.env.PORT || 3000;
const UrlDB = process.env.UrlDB;
const DB_NAME = process.env.DB_NAME;

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
app.use("/api", newApiDB);
app.use("/api_old", apiOld);
app.use("/upload", uploadRoute);
app.use("/public/books/", express.static(__dirname + "/public/books/"));

const authResBody = {
  id: 1,
  mail: "test@mail.ru",
};

app.use(notFoundMW);

const startApp = async (PORT, UrlDB, DB_NAME) => {
  try {
    await mongoose.connect(UrlDB, {
      dbName: DB_NAME,
    });
    app.listen(PORT) &&
      console.log(`Приложение успешно запущено localhost:${PORT}`);
  } catch (err) {
    console.error(
      `Ошибка при запуске приложения(port=${PORT}, db_adress=${UrlDB}): `,
      err
    );
  }
};

startApp(PORT, UrlDB, DB_NAME);
