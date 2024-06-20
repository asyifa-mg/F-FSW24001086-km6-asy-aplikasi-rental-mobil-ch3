const app = require("./app");
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("ping successfully");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
