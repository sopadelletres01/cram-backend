/* Controlador */
const { Sequelize, sequelize } = require('../models/db');
const { Commerce, Promotion } = require('../models');
const { uploadFile } = require('./file');
const Op = Sequelize.Op;
exports.promotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      include: Commerce.findOne(req.params.id),
    });
    // Now the ship comes with it
    console.log(promotions);
    res.send(promotions);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido listar los commerces',
    });
  }
};
exports.search = async (req, res) => {
  try {
    const commerce = await Commerce.searchComercio(req.params.cif);
    console.log(commerce);
    res.status(200).send(commerce);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'no hemos encontrar este NIF',
    });
    console.log(error);
  }
};
exports.index = async (req, res) => {
  try {
    const commerces = await Commerce.findAll();
    res.send(commerces);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido listar los commerces',
    });
  }
};
exports.store = async (req, res, next) => {
  try {
    let imagen = await uploadFile(req, res, next);
    console.log('imagen', imagen);

    const commerce = await Commerce.create({ ...req.body, photo: imagen.url });
    console.log(commerce);

    res.status(200).send(commerce);
  } catch (error) {
    res.status(464).send({
      message: error.message || 'Este Nif ya esta siendo utilizado.',
    });
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido  crear el commerce , revisa los datos introducidos',
    });
  }
  next();
};
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const commerce = await Commerce.findOne({ where: { id: id } });
    res.send(commerce);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido  encontrar el commerce que has seleccionado',
    });
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const commerce = await Commerce.update(req.body, { where: { id: id } });
    console.log('id', id);
    res.status(200).send('el commerce se ha actualizado correctamente');
  } catch (error) {
    res.status(404).send({
      message: error.message || 'No hemos podido encontrar el commerce que quieres modificar',
    });
  }
};
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const commerce = await Commerce.destroy({
      where: { id: id },
    });
    console.log(commerce);
    res.status(202).send({
      message: 'Se ha borrado el commerce correctament',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido encontrat el Commerce que has selecionado',
    });
  }
};
