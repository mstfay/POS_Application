const Product = require("../models/Product.js");

const express = require("express");

const router = express.Router();

// get all Product
router.get("/get-all", async (request, response) => {
  try {
    const products = await Product.find();
    response.status(200).json(products)
  } catch (error) {
    response.status(500).json(error);
  }
})


// create
router.post("/add-product", async (request, response) => {
  try {
    const newProduct = new Product(request.body);
    await newProduct.save();
    response.status(200).json("Item added successfully.");
  } catch (error) {
    response.status(500).json(error);
  }
});

// update
router.put("/update-product", async (request, response) => {
  try {
    await Product.findOneAndUpdate( { _id: request.body.productId }, request.body)
    response.status(200).json("Item updated successfully.")
  } catch (error) {
    console.log(error);
  }
});

// delete
router.delete("/delete-product", async (request, response) => {
  try {
    await Product.findOneAndDelete( { _id: request.body.productId })
    response.status(200).json("Item delete successfully.")
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;