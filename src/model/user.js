const mongoose = require("mongoose"); // Import mongoose library for MongoDB interactions
const { Schema } = mongoose; // Destructure Schema constructor from mongoose
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Define the schema for User collection
const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
      trim: true,
    },
    LastName: { type: String, trim: true },
    age: { type: Number, required: true, min: 18, max: 90 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    profileImg: {
      type: String,
      default: "https://img.daisyui.com/images/profile/demo/gordon@192.webp", 
      trim: true,
    },
    about: {
      type: String,
      default: "Hello i am new to Dev connect",
      trim: true,
      minLength: 0,
      maxLength: 100,
    },

    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 15; // Example: minimum 2, maximum 5 items
        },
        message: "Skills must have At least one or At Max. 15 ",
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password is weak. try some strong password which contain { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}"
          );
        }
      },
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@45Connect170804", { expiresIn: "1d" });
  return token
}
userSchema.methods.validatePassword = async function (password) {
  const user = this;
   const isPasswordCorrect = await bcrypt.compare(password, user.password); // Compare password hashes
  return isPasswordCorrect;
}


// Create the User model which interacts with the 'users' collection in MongoDB
const User = new mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
