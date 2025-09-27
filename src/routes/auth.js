const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const { validateUserData } = require("../utils/validation");

const authRouter = express.Router();

// ✅ Cookie options for cross-origin (Vercel <-> Render)
const cookieOptions = {
  httpOnly: true, // Not accessible by JS
  secure: true, // Needed for HTTPS
  sameSite: "None", // Allow cross-origin cookies
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// -------------------- SIGNUP --------------------
authRouter.post("/signup", async (req, res) => {
  try {
    validateUserData(req); // Validate incoming user data

    const { FirstName, LastName, email, password, gender, age, skills } =
      req.body;

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user document
    const user = new User({
      FirstName,
      LastName,
      email,
      age,
      password: passwordHash,
      gender,
      skills,
    });

    const savedUser = await user.save();

    // Create JWT
    const token = await user.getJWT();

    // Set token as cookie
    res.cookie("token", token, cookieOptions);

    res.json({ message: "User Account Created successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Something went Wrong!!!! Error: " + err.message);
  }
});

// -------------------- LOGIN --------------------
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found !!!");

    // Validate password
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) throw new Error("Password incorrect!!!!");

    // Create JWT
    const token = await user.getJWT();

    // Set token as cookie
    res.cookie("token", token, cookieOptions);

    res.json({ message: "Login Successfully", data: user });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// -------------------- LOGOUT --------------------
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { ...cookieOptions, maxAge: 0 });
  res.send("Logout Successfully");
});

module.exports = authRouter;
