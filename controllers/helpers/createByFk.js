

createByFk = (req, res, model, fk)=>{
    try{
      console.log("PATH",req.path)
      console.log("QUERY",req.query)
      console.log("ROUTE",req.route)
      const {id}=req.params;
      let models;

      models= model.build(req.body,{where:{[fk]:id}});
      console.log("models", models)
      models.save();
      res.send(models);
    }catch(error){
      res.status(500).send({
        message: 
        error.message || "No hemos podido crear la promocion"
      });
    }
    
  }
module.exports =  createByFk;
  