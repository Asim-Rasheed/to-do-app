const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const browserRoute = require("./routes/user.routes");


const app = express();
app.use(express.json());

app.use("/api",browserRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected.");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch(err => {
    console.log("DB not connected:", err);
  });

