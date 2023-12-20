const express = require("express");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
const courseRoute = require('./routes/courseRoute');

const DB = require("./config/dbConnect");



const app = express();



app.use(cors());
app.use(express.json());


 app.use("/api/courses", courseRoute);



app.listen(port, () => {
  console.log("server listening on port", port);
});
