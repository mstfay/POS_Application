const Bill = require("../models/Bill.js");

const express = require("express");

const router = express.Router();

// get all Bills
router.get("/get-all", async (request, response) => {
  try {
    const bills = await Bill.find();
    response.status(200).json(bills)
  } catch (error) {
    response.status(500).json(error);
  }
})


// create
router.post("/add-bill", async (request, response) => {
  try {
    const newBills = new Bill(request.body);
    await newBills.save();
    response.status(200).json("Item added successfully.");
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;