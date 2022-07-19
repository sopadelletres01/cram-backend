//const db = require("../../models");
//const ROLES = db.rol;
selectByFk = async (req, res, model, fk) => {
  try{
    /* console.log("PATH",req.path)
    console.log("QUERY",req.query)
    console.log("ROUTE",req.route) */
    const {id}=req.params
    let path = req.path.split("/")
  /*   console.log("PATHNEW",path) */
    let models;
    models = await model.findAll({where:{[fk]:id}});
    console.log("models:", models)
    return models
  }catch(error){
    throw new Error(error.message)
  }
}




module.exports = selectByFk;