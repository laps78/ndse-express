// import basic modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import newApiDB from "./src/routes/newApiDB.route";
import viewEngine from "./src/routes/viewEngine.route";

// import middleware & routers
import loggerMW from "./src/middleware/logger";
import notFoundMW from "./src/middleware/404.ts";
import errorMW from "./src/middleware/error";
import uploadRoute from "./src/routes/upload.route";

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
app.use("/upload", uploadRoute);
app.use("/public/books/", express.static(__dirname + "/public/books/"));

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
