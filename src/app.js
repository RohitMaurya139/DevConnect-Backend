const express = require("express"); // Import express for creating the web server
const bcrypt = require("bcryptjs"); // Library for hashing passwords
const jwt = require("jsonwebtoken"); // Library for handling JSON Web Tokens (JWT)
const cookieParser = require("cookie-parser"); // Middleware to parse cookies from requests
const connectDB = require("./config/database"); // Import custom database connection function for MongoDB
const User = require("./model/user"); // Import the User model for interacting with user documents in MongoDB
const validateUserData = require("./utils/validation"); // Custom validation for user data
const UserAuth= require("./middlewares/auth")
const app = express(); // Create an Express application instance

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies from incoming requests

// Handle POST requests to /signup to create a new user
app.post("/signup", async (req, res) => {
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

    await user.save(); // Save user to MongoDB
    res.send("User Account Created successfully");
  } catch (err) {
    // Catch validation or database errors
    res.status(400).send("Something went Wrong!!!! Error: " + err.message);
  }
});

// Handle POST requests to /login to authenticate a user
app.post("/login", async (req, res) => {
  try {
    const { email,password } = req.body; // Extract login credentials

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

      res.send("Login Successful");
    } else {
      throw new Error("Password incorrect!!!!");
    }
  } catch (err) {
    // Return error if login fails
    res.status(400).send("Error : " + err.message);
  }
});

// Handle GET requests to /profile to return logged-in user's profile using JWT from cookie
app.get("/profile", UserAuth, async (req, res) => {
  try {
    // Send user profile data
    const user =req.user
      res.send(user);
    
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/connectionRequest", UserAuth, async (req, res) => {
  const user = req.user
  
  res.send(user.FirstName+" Sent Request")
})

// Connect to the MongoDB database and start the server if successful
connectDB()
  .then(() => {
    console.log("Database Connected successfully");
    app.listen(3000, () => {
      console.log("server successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database Connection Unsuccessful");
  });
