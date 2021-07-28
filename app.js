// import express from "express";
const express = require("express");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");

//routes
const cakeRoutes = require("./API/cake/routes");
const bakeryRoutes = require("./API/bakery/routes");
const userRoutes = require("./API/user/routes");
const orderRoutes = require("./API/order/routes");

//passports
const passport = require("passport");
const {localStrategy} = require("./middleware/passport");
const {jwtStrategy} = require("./middleware/passport");


//database
const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//=============== Cake Routes ===============\\
app.use("/cakes", cakeRoutes); 
app.use("/bakeries", bakeryRoutes);
app.use(orderRoutes);
app.use(userRoutes);



//to be able to access media and show the photos
app.use("/media",express.static("media"));

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
      await db.sequelize.sync({alter : true});
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
    } catch(error) {
      console.error(error);
    }
  };
  run();


