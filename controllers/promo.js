const { Sequelize, sequelize } = require("../models/db");
const { Promotion } = require("../models");
const { uploadFile } = require("./file");
const Op = Sequelize.Op;
// Create and Save a new Promotion
// Retrieve all Promotions from the database.
exports.index = async (req, res) => {
  try {
    const Promotions = await Promotion.findAll();
    console.log("Promotions", Promotions);
    res.send(Promotions);
  } catch (error) {
    res.status(500).send({
      message: error.message || "No hemos podido listar los Promotions",
    });
  }
};
exports.store = async (req, res, next) => {
  try {
    let image = await uploadFile(req, res, next);
    console.log("IMAGENNNNN funciona", image);
    const promocion = await Promotion.build({ ...req.body, src: image.url });
    /* probar en poner MockData.JSON */
    await promocion.save();
    res.status(200).send(promocion);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message:
        error.message ||
        "No se ha podido crear el Promotion, revisa los datos introducidos",
    });
  }
};
// Find a single Promotion with an id
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const promo = await Promotion.findByPk(id);
    return res.status(200).send(promo);
  } catch (error) {
    res.status(404).send({
      message:
        error.message ||
        "No hemos podido encontrar el Promotion con el id seleccionado",
    });
  }
};
// Update a Promotion by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const promocion = await Promotion.update(req.body, {
      where: { id: id },
    });
    console.log("Promotion", promocion);
    res.status(200).send("La promocion se ha actualizado correctamente");
  } catch (error) {
    res.status(404).send({
      message:
        error.message ||
        "No hemos podido encontrar el Promotion con el id seleccionado",
    });
  }
};
// Delete a Promotion with the specified id in the request
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const promo = await Promotion.destroy({
      where: { id: id },
    });
    console.log("promo", promo);
    res.status(200).send("la promocion se ha eliminado correctamente");
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "No hemos podido encontrar la promocion con el id seleccionado",
    });
  }
};
