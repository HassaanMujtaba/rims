const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { router } = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const fileupload = require("express-fileupload");

app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
});

console.log("[!] Connecting to database...");
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("[+] Database connected.");
    app.listen(PORT, () => {
      console.log(`[+] Server started: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`[-] ${error}`);
  });
