const express = require("express");
const {cakeFetch,deleteCake,createCake,updateCake} = require("./controllers");

const router = express.Router();

//List route
router.get("/", cakeFetch);

//Delete route
router.delete("/:cakeId", deleteCake);

//Create route
router.post("/", createCake);

//Update route
router.put("/:cakeId", updateCake);

module.exports = router;
