const express = require("express");
const app = express();
const { AdminAuth, UserAuth } = require("./middlewares/auth");

// Authentication middleware applied to all /admin routes
app.use("/admin", AdminAuth);

// Authentication middleware applied to all /user routes
app.use("/user", UserAuth);

// Global error-handling middleware for any errors passed down in the middleware chain
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("SomeThing went wrong");
  }
});

// Route to get all admin data with error catching
app.get("/admin/getAllData", (req, res, next) => {
  try {
    res.send("All Data send");
  } catch (err) {
    res.status(500).send("SomeThing Went Wrong");
  }
});

// Route to delete a user under /admin
app.get("/admin/deleteUser", (req, res, next) => {
  res.send("Delete a user");
});

// Route to get user details for a specific userId as URL param
app.get("/user/:userId", (req, res) => {
  console.log(req.params); // Logs the userId param
  res.send({
    firstName: "Rohit",
    lastName: "Maurya",
    email: "rohit139maurya@gmail.com",
  });
});

// User login route responds with success message
app.post("/user/login", (req, res) => {
  res.send("User successfully logged in");
});

// Route to delete a user on /user path
app.delete("/user", (req, res) => {
  res.send("Deleted successfully from database");
});

// Start server on port 7777
app.listen(7777, () => {
  console.log("server successfully listening on port 7777");
});
