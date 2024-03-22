const app = require("./app");
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Ping successful");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
