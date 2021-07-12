//import db model
const { Cake } = require("../../db/models");


exports.fetchCake = async (cakeId, next) =>{
    try{
        const cake = await Cake.findByPk(cakeId);
    return cake;
}catch(error){
    next(error);
}};

//=============== IMPORTANT ===============\\
///////// ALWAYS PUT REQ BEFORE RES \\\\\\\\\\

exports.cakeFetch = async (req,res, next) => {
    //findAll is to print all cakes
   try{ const cakes = await Cake.findAll({
    //to print specific things we use attributes x//{exclude:[]} is to print everything except
        attributes : {exclude:["createdAt", "updatedAt"]},
    });
    res.json(cakes);
} catch(error){
    next(error);
}
};
exports.deleteCake = async (req,res, next) => {
   try{ 
    await req.cake.destroy();
    res.status(204).end();   
    }catch(error){
    next(error);
    }
};
exports.updateCake = async (req, res, next) => {
    try{ 
        await req.cake.update(req.body);
        res.status(204).end();
     }catch(error){
         next(error);
     }};

exports.createCake = async (req,res, next) => {
   try{
       const newCake = await Cake.create(req.body);
    res.status(201).json(newCake);
}catch(error){
    next(error);
}};

