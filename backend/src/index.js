const express = require("express");
const router = require("./router");
const path = require("path")
const PORT = 5000;
const app = express();
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});


