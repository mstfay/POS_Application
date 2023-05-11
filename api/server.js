const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const port = 5000;

// routes

const categoryRoute = require("./routes/Categories.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);

app.get(`/`, (request, response) => response.send("Merhaba canım"));

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});

