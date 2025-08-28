const mongoose = require("mongoose"); // Import mongoose library for MongoDB interactions
const { Schema } = mongoose; // Destructure Schema constructor from mongoose

// Define the schema for User collection
const userSchema = new Schema({
  FirstName: String, // User's first name (String type)
  LastName: String, // User's last name (String type)
  age: Number, // User's age (Number type)
  email: String, // User's email address (String type)
  password: String, // User's password (String type)
  gender: String, // User's gender (String type)
});

// Create the User model which interacts with the 'users' collection in MongoDB
const User = mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
