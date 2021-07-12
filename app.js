// import express from "express";
const express = require("express");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const cakeRoutes = require("./API/cake/routes");


//database
const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());



//=============== Cookie Routes ===============\\
app.use("/cakes", cakeRoutes);

//error middleware
app.use((err,req,res,next)=>{
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

//path not found
app.use((req,res,next) => {
  res.status(404).json({ message: "Path Not Found." });
});

  const run = async() => {
    try{
      //{force:true } do it once inside sync()
      await db.sequelize.sync();
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
    } catch(error) {
      console.error(error);
    }
  };
  run();


