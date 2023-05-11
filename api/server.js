const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

app.get(`/`, (request, response) => response.send("Merhaba canım"));

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
