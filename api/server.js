const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const port = 5000;

// routes
const categoryRoute = require("./routes/Categories.js");
const productRoute = require("./routes/Products.js");
const billRoute = require("./routes/Bills.js");
const authRoute = require("./routes/Auth.js");

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
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});

