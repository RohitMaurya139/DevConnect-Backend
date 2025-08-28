const express = require("express");
const app = express();

// Register multiple middleware handlers for the path '/user'
// These handlers execute sequentially whenever a request URL starts with '/user'
app.use(
  "/user",
  (req, res, next) => {
    // This is the first middleware for '/user'
    // Logs message then passes control to the next middleware
    console.log("route handler 1");
    next();
  },
  (req, res, next) => {
    // Second middleware in the chain for '/user'
    // Logs message then passes control to next middleware
    console.log("route handler 2");
    next();
  },
  (req, res, next) => {
    // Third middleware for '/user'
    // Logs message then passes control forward
    console.log("route handler 3");
    next();
  },
  (req, res, next) => {
    // Fourth middleware for '/user'
    // Logs message then passes control forward
    console.log("route handler 4");
    next();
  },
  (req, res, next) => {
    // Last middleware in this chain for '/user'
    // Sends response "route handler 5" and logs message
    // Once response is sent, middleware chain ends here
    res.send("route handler 5");
    console.log("route handler 5");
  }
);

// Adds another middleware on '/user' which logs "route handler 2"
// and then calls next(), allowing subsequent middleware to run
app.use("/user", (req, res, next) => {
  console.log("route handler 2");
  next();
});

// Adds a final middleware on '/user' that sends a response "route handler 1"
// and logs "route handler 1". Since response is sent, next() is not called,
// so middleware chain stops here.
app.use("/user", (req, res, next) => {
  res.send("route handler 1");
  console.log("route handler 1");
  // no next() here, so this ends the request-response cycle
});

// Start the server listening on port 2000
app.listen(2000, () => {
  console.log("server successfully listening on port 2000");
});
