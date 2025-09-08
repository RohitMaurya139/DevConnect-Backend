const express = require("express")
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const {validateUserData} = require("../utils/validation");

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
  try {
    validateUserData(req); // Validate incoming user data

    // Destructure user details from request body
    const { FirstName, LastName, email, password, gender, age, skills } =
      req.body;

    // Hash password asynchronously with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user document
    const user = new User({
      FirstName,
      LastName,
      email,
      age,
      password: passwordHash, // Store hashed password
      gender,
      skills,
    });
      
    const savedUser = await user.save(); // Save user to MongoDB
    const token = await user.getJWT();
    res.cookie("token",token,)
    res.json({ message: "User Account Created successfully",data:savedUser });
  } catch (err) {
    // Catch validation or database errors
    res.status(400).send("Something went Wrong!!!! Error: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Extract login credentials

    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      throw new Error("User Not Found !!!");
    }

    const isPasswordCorrect = await user.validatePassword(password); // Compare password hashes
    if (isPasswordCorrect) {
      // Sign a JWT with user ID as payload
      const token = await user.getJWT();

      // Set JWT as a cookie, HTTP only, expires in 1 day
      res.cookie("token", token);

      res.json({ message: "Login Successfully", data: user })
      
    } else {
      throw new Error("Password incorrect!!!!");
    }
  } catch (err) {
    // Return error if login fails
    res.status(400).send("Error : " + err.message);
  }
});
authRouter.post("/logout",async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send(" Logout SuccessFully")
})

module.exports = authRouter;