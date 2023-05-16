const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// login
router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    !user && response.status(404).send({ error: "User not found!" });

    const validPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!validPassword) {
      response.status(403).json("Şifre doğru değil!");
    } else {
      response.status(200).json(user);
    }

    response.send(user);
  } catch (error) {
    response.status(500).json(error);
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
    response.status(500).json(error);
  }
});

module.exports = router;
