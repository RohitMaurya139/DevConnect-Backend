// getting-started.js
const mongoose = require("mongoose");
async function connectDB() {
  await mongoose.connect(
    process.env.VITE_MONGO_URI,
  );

};
module.exports = connectDB;

