/* Controlador */
const { Sequelize, sequelize } = require("../models/db");
const { Commerce, Promotion } = require("../models");
const { uploadFile } = require("./file");
const Op = Sequelize.Op;
exports.promos = async (req, res) => {
  try {
    const promos = await Promotion.findAll({
      include: Commerce.findOne(req.params.id),
    });
    // Now the ship comes with it
    console.log(promos);
    res.send(promos);
  } catch (error) {
    res.status(500).send({
      message: error.message || "No hemos podido listar los comercios",
    });
  }
};
exports.search = async (req, res) => {
  try {
    const comercio = await Commerce.searchComercio(req.params.nif);
    console.log(comercio);
    res.status(200).send(comercio);
  } catch (error) {
    res.status(500).send({
      message: error.message || "no hemos encontrar este NIF",
    });
    console.log(error);
  }
};
exports.index = async (req, res) => {
  try {
    const comercios = await Commerce.findAll();
    res.send(comercios);
  } catch (error) {
    res.status(500).send({
      message: error.message || "No hemos podido listar los comercios",
    });
  }
};
exports.store = async (req, res, next) => {
  try {
    let imagen = await uploadFile(req, res, next);
    console.log("imagen", imagen);

    const comercio = await Commerce.create({ ...req.body, src: imagen.url });
    console.log(comercio);

    res.status(200).send(comercio);
  } catch (error) {
    res.status(464).send({
      message: error.message || "Este Nif ya esta siendo utilizado.",
    });
    console.log("error", error);
    res.status(500).send({
      message:
        error.message ||
        "No hemos podido  crear el comercio , revisa los datos introducidos",
    });
  }
  next();
};
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const comercio = await Commerce.findOne({ where: { id: id } });
    res.send(comercio);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message:
        error.message ||
        "No hemos podido  encontrar el comercio que has seleccionado",
    });
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const comercio = await Commerce.update(req.body, { where: { id: id } });
    console.log("id", id);
    res.status(200).send("el comercio se ha actualizado correctamente");
  } catch (error) {
    res.status(404).send({
      message:
        error.message ||
        "No hemos podido encontrar el comercio que quieres modificar",
    });
  }
};
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const comercio = await Commerce.destroy({
      where: { id: id },
    });
    console.log(comercio);
    res.status(202).send({
      message: "Se ha borrado el comercio correctament",
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "No hemos podido encontrat el Commerce que has selecionado",
    });
  }
};
