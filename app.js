// import express from "express";
const express = require("express");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const cakeRoutes = require("./API/cake/routes");


//database
const db = require("./db/models");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//=============== Cookie Routes ===============\\
app.use("/cakes", cakeRoutes);

  const run = async() => {
    try{
      await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
    } catch(error) {
      console.error(error);
    }

  };
  run();


