const Category = require("../models/Category.js");

const express = require("express");

const router = express.Router();

// get all category
router.get("/get-all", async (request, response) => {
  try {
    const categories = await Category.find();
    response.status(200).json(categories)
  } catch (error) {
    response.status(500).json(error);
  }
})


// create
router.post("/add-category", async (request, response) => {
  try {
    const newCategory = new Category(request.body);
    await newCategory.save();
    response.status(200).json("Item added successfully.");
  } catch (error) {
    response.status(500).json(error);
  }
});

// update
router.put("/update-category", async (request, response) => {
  try {
    await Category.findOneAndUpdate( { _id: request.body.categoryId }, request.body)
    response.status(200).json("Item updated successfully.")
  } catch (error) {
    response.status(500).json(error);
  }
});

// delete
router.delete("/delete-category", async (request, response) => {
  try {
    await Category.findOneAndDelete( { _id: request.body.categoryId })
    response.status(200).json("Item delete successfully.")
  } catch (error) {
    response.status(500).json(error);
  }
});


module.exports = router;