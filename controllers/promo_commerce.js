/* Controladores */

/* Controlador */
const { Sequelize, sequelize } = require('../models/db');
const { Promotion } = require('../models');
const { selectByFk, createByFk, deleteByFk, updateByFk, getIdByFk } = require('./helpers');
const Op = Sequelize.Op;

exports.index = async (req, res) => {
  try {
    const promotions = await selectByFk(req, res, Promotion, 'comercio_id');
    console.log('PROMOS', promotions);
    res.status(200).send(promotions);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

exports.store = (req, res) => {
  /* const Promotion = await Promotion.build({...req.body, comercio_id:req.params.id}); */
  createByFk(req, res, Promotion, 'comercio_id');
};
exports.show = async (req, res) => {
  getIdByFk(req, res, Promotion, 'comercio_id', 'id');
};
exports.update = async (req, res) => {
  updateByFk(req, res, Promotion, 'comercio_id', 'id');
};
exports.destroy = async (req, res) => {
  deleteByFk(req, res, Promotion, 'comercio_id', 'id');
};
