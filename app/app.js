const express = require("express");
const { errorHandler } = require("./middleware");

const router = require("./routes/router");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(router);
app.use(errorHandler);

module.exports = app;
