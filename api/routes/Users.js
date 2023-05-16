const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

// get all Users
router.get("/get-all", async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

// get a user
router.get("/", async (request, response) => {
  const userId = request.body.userId;
  try {
    const user = await User.findById(userId);
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
