const express = require("express");
const app = express();

app.get(/^\/ab?c$/, (req, res) => {
  res.send({
    firstName: "Rocky",
    lastName: "Maurya",
    email: "rocky194maurya@gmail.com",
  });
});
app.get(/^\/ab+c$/, (req, res) => {
  res.send({
    firstName: "Prem",
    lastName: "Maurya",
    email: "prem098maurya@gmail.com",
  });
});
app.get(/^\/ab.*cd$/, (req, res) => {
  res.send({
    firstName: "Akky",
    lastName: "Maurya",
    email: "akky456maurya@gmail.com",
  });
});

app.get(/^\/a(bc)?d$/, (req, res) => {
  res.send({
    firstName: "gkky",
    lastName: "Maurya",
    email: "akky456maurya@gmail.com",
  });
});

app.get("/user/:userId", (req, res) => {
    console.log(req.params)
    // console.log(req.query)
  res.send({
    firstName: "Rohit",
    lastName: "Maurya",
    email: "rohit139maurya@gmail.com", // fixed typo "emsil"
  });
});

app.post("/user", (req, res) => {
  console.log("Saved data to the database");
  res.send("Data successfully saved to database");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully from database");
});

// Use app.get here if you want to handle only GET requests on /test
app.get("/test", (req, res) => {
  res.send("Hello From test");
});

// Removed app.use("/user") middleware that conflicts with user routes

app.listen(3000, () => {
  console.log("server successfully listening on port 3000");
});
