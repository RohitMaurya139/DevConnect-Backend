// getting-started.js
const mongoose = require("mongoose");
async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://Rohit139:nqvY6YRzptM4UJw9@namestenode.wyrxqnh.mongodb.net/devConnect"
  );

};
module.exports = connectDB;

