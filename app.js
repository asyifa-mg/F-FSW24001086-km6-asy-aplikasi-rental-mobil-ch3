const express = require("express");
const morgan = require("morgan");

const app = express();

const carRouter = require("./routes/carRoutes");

//middelware untuk membaca JSON dari request body ke kita
app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/cars", carRouter);

module.exports = app;
