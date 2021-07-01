// import express from "express";
const express = require("express");
// let cakes = require("./cakes");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const cakeRoutes = require("./API/cake/routes");
// const slugify = require("slugify");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//=============== Cookie Routes ===============\\
app.use("/cakes", cakeRoutes);

app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });


