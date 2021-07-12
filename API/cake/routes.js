const express = require("express");
const {cakeFetch,deleteCake,createCake,updateCake, fetchCake,} = require("./controllers");

const router = express.Router();

//param middleware
router.param("cakeId", async (req, res, next, cakeId)=> {
const cake = await fetchCake(cakeId,next);
if(cake){
    req.cake=cake;
    next();
    }
else{
    const error = new Error("cake not found");
        error.status= 404;
        next(error);
}
});

//List route
router.get("/", cakeFetch);

//Delete route
router.delete("/:cakeId", deleteCake);

//Create route
router.post("/", createCake);

//Update route
router.put("/:cakeId", updateCake);


module.exports = router;
