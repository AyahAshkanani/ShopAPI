const express = require("express");
const multer = require("multer");
const passport = require("passport");
const { bakeryFetch, createBakery, fetchBakery,createCake} = require("./controllers");
const router = express.Router();

//multer
const storage = multer.diskStorage({
    destination:"./media",
    filename:(req,file,cb)=>(
        cb(null,`${Date.now()}${file.originalname}`)
    ),

});
const upload = multer({storage});

//param middleware
router.param("bakeryId", async (req, res, next, bakeryId)=> {
    const bakery = await fetchBakery(bakeryId,next);
    if(bakery){
        req.bakery=bakery;
        next();
        }
    else{
        const error = new Error("Bakery not found");
            error.status= 404;
            next(error);
    }
    });

//list
router.get("/", bakeryFetch);

//Create route
router.post("/",passport.authenticate("jwt", {session: false}) ,upload.single("image"), createBakery);
//POST localhost:8000/bakeries/

//cake
router.post("/:bakeryId/cakes",passport.authenticate("jwt", {session: false}),upload.single("image"), createCake);

module.exports = router;
