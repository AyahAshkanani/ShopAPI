let cakes = require("../../cakes");
const slugify = require("slugify");

exports.cakeFetch = (req,res) => {
    res.json(cakes);
};

exports.deleteCake = (req,res) => {
    const { cakeId } = req.params;
    const foundCake = cakes.find((cake)=> cake.id === +cakeId);

    if(foundCake){ 
        cakes = cakes.filter((cake)=> cake.id !== +cakeId);
        res.status(204).end();
    }
    else{
        res.status(404).json({message : "cake not found"});
    }
   
    
};

exports.createCake = (req,res) => {
    const id = cakes.length +1;
    const slug = slugify(req.body.name, {lower : true});
    const newCake = {
        id,
        slug,
        ...req.body,
    };

    cakes.push(newCake);
    res.status(201).json(newCake);

};
// Update Route
exports.updateCake = (req, res) => {
    const { cakeId } = req.params;
    // check if cookie exists
    const foundCake = cakes.find((cake) => cake.id === +cakeId);
    // if cookie exists:
    if (foundCake) {
      // update cookie
      for (const key in req.body) foundCake[key] = req.body[key];
      foundCake.slug = slugify(foundCake.name, { lower: true });
      res.status(204).end();
    } else {
      //  give back response 404 Cookie Not Found
      res.status(404).json({ message: "Cake Not Found." });
    }
  };
