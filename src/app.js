const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("Hello From test");
});
app.use("/rohit", (req, res) => {
  res.send("Hello From rohit");
});
app.use("/piki", (req, res) => {
  res.send("Hello From piki");
});
app.use("/raju", (req, res) => {
  res.send("Hello From raju");
});


app.use( (req, res) => {
  res.send("Hello From dashBoard");
});

app.listen(3000, () => {
  console.log("server succesFully listening port 3000");
});
