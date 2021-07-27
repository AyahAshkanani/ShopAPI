const express = require("express");
const {cakeFetch,deleteCake,updateCake, fetchCake,} = require("./controllers");

const router = express.Router();
const multer = require("multer");

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

//multer
const storage = multer.diskStorage({
    destination:"./media",
    filename:(req,file,cb)=>(
        cb(null,`${Date.now()}${file.originalname}`)
    ),

});
const upload = multer({storage});

//List route
router.get("/", cakeFetch);

//Delete route
router.delete("/:cakeId", deleteCake);


//Update route
router.put("/:cakeId",upload.single("image"),updateCake);


module.exports = router;
