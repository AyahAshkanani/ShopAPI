// import express from "express";
const express = require("express");
let cakes = require("./cakes");
const cors = require("cors"); // yarn add cors

const app = express();

// Middleware
app.use(cors());

// Routes
app.get("/cakes", (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(cakes);
});

app.delete("/cakes/:cakeId",(req,res) => {
    const{cakeId} = req.params;
    const foundCake = cakes.find((cake)=> cake.id === +cakeId);

    if(foundCake){ 
        cakes = cakes.filter((cake)=> cake.id !== +cakeId);
        res.status(204).end();
    }
    else{
        res.status(404).json({message : "cake not found"});
    }
   
    
});


app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });