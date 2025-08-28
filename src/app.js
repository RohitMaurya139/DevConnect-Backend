const express = require("express"); // Import express for creating the web server
const connectDB = require("./config/database"); // Import custom database connection function for MongoDB
const User = require("./model/user"); // Import the User model for interacting with user documents in MongoDB

const app = express(); // Create an Express application instance
app.use(express.json())
// Handle POST requests to /signup to create a new user
app.post("/signup", async (req, res) => {
  // Create a new User instance with hardcoded data (ideally this should come from req.body)
  const user = new User(req.body);

  try {
    // Save the user document to the database asynchronously
    await user.save();
    // Send success response if save is successful
    res.send("User Account Created successfully");
  } catch (err) {
    // Catch DB errors or validation errors and send failure message
    res.status(400).send("Something went Wrong!!!! Error: "+ err.message);
  }
});

// Connect to the MongoDB database and then start the server
connectDB()
  .then(() => {
    // Log database connection success
    console.log("Database Connected successfully");
    // Start the Express server listening on port 3000
    app.listen(3000, () => {
      console.log("server successfully listening on port 3000");
    });
  })
  .catch((err) => {
    // Log database connection failure error
    console.error("Database Connection Unsuccessful");
  });
