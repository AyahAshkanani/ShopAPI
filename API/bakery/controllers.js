const { Bakery, Cake } = require("../../db/models");
exports.fetchBakery = async (bakeryId, next) =>{
    try{
        const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
}catch(error){
    next(error);
}};

//list
exports.bakeryFetch = async (req,res, next) => {
    //findAll is to print all bakeries
   try{ const bakeries = await Bakery.findAll({
    //to print specific things we use attributes x//{exclude:[]} is to print everything except
        attributes : {exclude:["createdAt", "updatedAt"]},
        include:{
            model: Cake,
            as: "cakes",
            attributes: ["id"],
        }
    });
    res.json(bakeries);
} catch(error){
    next(error);
}};
//create
exports.createBakery = async (req,res, next) => {
    try{
       if(req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
        const newBakery = await Bakery.create(req.body);
     res.status(201).json(newBakery);
 }catch(error){
     next(error);
 }};
 
exports.createCake = async (req,res, next) => {
    try{
       if(req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
       req.body.bakeryId = req.bakery.id;
        const newCake = await Cake.create(req.body);
     res.status(201).json(newCake);
 }catch(error){
     next(error);
 }};
 
 


