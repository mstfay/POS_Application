const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// get all Users
router.get("/get-all", async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json(users)
  } catch (error) {
    console.log(error);
  }
});

// register
router.post("/register", async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    response.status(200).json("A new user create successfully.");
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = router;
