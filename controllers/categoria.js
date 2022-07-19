const {Sequelize,sequelize}=require('../models/db');
const{Categorias}=require('../models');
const Op=Sequelize.Op;



exports.index=async ( req, res)=>{
    console.log("query",req.query) 
    try{   
        const categorias = await Categorias.findAll();
        res.send(categorias);

    }catch(error){
        res.status(500).send({
            message: 
                error.message || "No hemos podido listar los eventos"
        });
    }
};
exports.store = async (req, res) => {
    try {
      const categoria = Categorias.build(req.body);
      /* probar en poner MockData.JSON */
      categoria.save();
      res.send(categoria)
    } catch (error) {
      console.log("error",error)
      res.status(500).send({
        message:
          error.message || "No se ha podido crear el categoria, revisa los datos introducidos"
      });
    }
  };
  // Find a single Categoria with an id
  exports.show = async (req, res) => {
    try {
      const id = req.params.id;
      const categoria = await Categoria.findByPk(id);
      return res.status(200).send(categoria);
    } catch (error) {
      res.status(404).send({
        message:
          error.message || "No hemos podido encontrar el categoria con el id seleccionado"
      });
    }
  };
  // Update a Categoria by the id in the request
  exports.update = async (req, res) => {
    try {
      const id = req.params.id;
      const categoria = await Categoria.update(req.body,{
        where : {id : id}
      });
      res.send("El categoria se ha actualizado correctamente");
    } catch (error) {
      res.status(404).send({
        message:
          error.message || "No hemos podido encontrar el categoria con el id seleccionado"
      });
    }
  };
  // Delete a Categoria with the specified id in the request
  exports.destroy = async (req, res) => {
    try {
      const id = req.params.id;
      const categoria = await Categoria.destroy({
        where : {id : id}
      });
      res.send("El categoria se ha eliminado correctamente");
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "No hemos podido encontrar el categoria con el id seleccionado"
      });
    }
}