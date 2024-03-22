const fs = require("fs");

//Membaca file JSON
const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/dummy.json`));

const getCarsData = (req, res, next) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    data: {
      cars,
    },
  });
};

const getCarsById = (req, res, next) => {
  const Id = req.params.id;

  //Gunakan filter untuk mencari mobil berdasarkan ID
  const car = cars.find((mobil) => mobil.id === Id);

  //periksa apakah data mobil ditemukan
  if (car) {
    res.status(200).json({
      status: "success",
      data: {
        car, // Mengembalikan hanya mobil yang sesuai dengan ID
      },
    });
  } else {
    // Jika mobil tidak ditemukan, kirim respons dengan status 404
    res.status(404).json({
      status: "fail",
      message: "Data mobil tidak ditemukan",
    });
  }
};

const createCars = (req, res, next) => {
  console.log(req.body);
  const newCar = req.body;
  cars.push(newCar);
  fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        car: newCar,
      },
    });
  });
};

const updateCars = (req, res, next) => {
  const Id = req.params.id;

  //cari data sesuai parameter ID
  const car = cars.find((mobil) => mobil.id === Id);
  const carIndex = cars.findIndex((mobil) => mobil.id === Id);

  //periksa apakah data ditemukan
  if (!car) {
    return res.status(404).json({
      status: "fail",
      message: `Data mobil dengan ID: ${Id} tidak ditemukan`,
    });
  }

  //jika data ada, update sesuai request body dari client/user
  cars[carIndex] = { ...cars[carIndex], ...req.body };

  fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      message: "Berhasil update data mobil",
    });
  });
};

const deleteCars = (req, res, next) => {
  const Id = req.params.id;

  //cari data sesuai parameter ID
  const car = cars.find((mobil) => mobil.id === Id);
  const carIndex = cars.findIndex((mobil) => mobil.id === Id);

  //periksa apakah data ditemukan
  if (!car) {
    return res.status(404).json({
      status: "fail",
      message: `Data mobil dengan ID: ${Id} tidak ditemukan`,
    });
  }

  //jika data ada, delete sesuai request body dari client/user
  cars.splice(carIndex, 1);

  fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      message: "Berhasil delete data mobil",
    });
  });
};

module.exports = {
  getCarsData,
  getCarsById,
  updateCars,
  deleteCars,
  createCars,
};
