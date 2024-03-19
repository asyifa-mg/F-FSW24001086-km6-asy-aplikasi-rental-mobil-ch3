const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 8080;

//middelware
app.use(express.json());

const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

app.get("/", (req, res, next) => {
  res.send("<p>ping successfully</p>");
});

app.get("/cars", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  });
});

app.post("/cars", (req, res, next) => {
  console.log(req.body);
  const newCars = req.body;
  cars.push(newCars);
  fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        car: newCars,
      },
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
