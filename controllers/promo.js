const {Sequelize,sequelize} = require("../models/db");
const {Promocion} = require("../models");
const { uploadFile } = require("./file");
const Op = Sequelize.Op;
// Create and Save a new Promocion
// Retrieve all Promociones from the database.
exports.index = async (req, res) => {
  try {
    const Promociones = await Promocion.findAll();
    console.log("Promociones",Promociones)
    res.send(Promociones);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "No hemos podido listar los Promociones"
    });
  }
};
exports.store = async (req, res, next) => {
  try {
    let image = await uploadFile(req, res, next);
    console.log("IMAGENNNNN funciona",image)
    const promocion = await Promocion.build({...req.body,src:image.url});
    /* probar en poner MockData.JSON */
    await promocion.save();
    res.status(200).send(promocion)
  } catch (error) {
    console.log("error",error)
    res.status(500).send({
      message:
        error.message || "No se ha podido crear el Promocion, revisa los datos introducidos"
    });
  }
};
// Find a single Promocion with an id
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const promo = await Promocion.findByPk(id);
    return res.status(200).send(promo);
  } catch (error) {
    res.status(404).send({
      message:
        error.message || "No hemos podido encontrar el Promocion con el id seleccionado"
    });
  }
};
// Update a Promocion by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const promocion = await Promocion.update(req.body,{
      where : {id : id}
    });
    console.log("Promocion",promocion)
    res.status(200).send("La promocion se ha actualizado correctamente");
  } catch (error) {
    res.status(404).send({
      message:
        error.message || "No hemos podido encontrar el Promocion con el id seleccionado"
    });
  }
};
// Delete a Promocion with the specified id in the request
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const promo = await Promocion.destroy({
      where : {id : id}
    });
    console.log("promo",promo)
    res.status(200).send("la promocion se ha eliminado correctamente");
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "No hemos podido encontrar la promocion con el id seleccionado"
    });
  }
};