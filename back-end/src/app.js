const express = require("express");
const cors = require("cors");
const countryRoutes = require("./routes/countryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/countries", countryRoutes);

module.exports = app;
