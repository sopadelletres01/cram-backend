const { Sequelize, sequelize } = require('../models/db');
const { User, Promotion, Usu_comercio } = require('../models');

const Op = Sequelize.Op;
// Create and Save a new User
// Retrieve all Usuarios from the database.
exports.getPromoComerAndUser = async (req, res) => {
  console.log('REQ', req.params.dni);
  try {
    const usu_promo_comer = await User.getPromoComer(req.params.dni, req.params.id);
    console.log(usu_promo_comer);
    res.status(200).send(usu_promo_comer);
  } catch (e) {
    res.status(500).send({
      message: e.message || 'no hemos encontrado nada con estos parametros.',
    });
  }
};

exports.inscription = async (req, res) => {
  try {
    models = await User.getInscriptions(req);
    res.send(models);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido listar los users',
    });
  }
};
exports.deleteInscriptions = async (req, res) => {
  try {
    deleted = await User.deleteInscriptionsByUser(req);
    console.log(deleted);
    res.status(200).send({ message: 'Se han boorado las Inscriptions del user' });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido eliminar las Inscriptions del user',
    });
  }
};
exports.getPromotions = async (req, res) => {
  try {
    let models;
    console.log('req', req.query);
    if (req.query.expired === 'true') {
      models = await User.getPromotionsExpiredByUser(req);
      console.log('Promos', models);
      return res.status(200).send(models);
    }
    models = await User.getPromotions(req);
    res.send(models);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido listar los users',
    });
  }
};

exports.getPromotion = async (req, res) => {
  try {
    let promo = await User.getPromo(req);
    console.log('promo', promo);
    if (promo) {
      return res.status(200).send(promo);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido seleccionar la Promotion',
    });
  }
};

exports.index = async (req, res) => {
  try {
    if (req.query.dni) {
      const user = await User.findOne({ where: { dni: req.query.dni } });
      return res.status(200).send(user);
    }
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido listar los users',
    });
  }
};
exports.store = async (req, res) => {
  try {
    if (req.query.comercial === 'true') {
      const user = await User.create({ ...req.body, rol_id: 4 });
      console.log('USUario', user);
      return res.status(200).send(user);
    }
    const user = await User.build(req.body);
    /* probar en poner MockData.JSON */
    const usu = await user.save();
    console.log('usuariooooo', usu);
    res.send(user);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No se ha podido crear el user, revisa los datos introducidos',
    });
  }
};
// Find a single User with an id
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.send(user);
  } catch (error) {
    res.satus(404).send({
      message: error.message || 'No hemos podido encontrar el user con el id seleccionado',
    });
  }
};
// Update a User by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    const usuarioUpdated = await user.update(req.body, {
      where: { id: id },
    });
    console.log('user', usuarioUpdated);
    res.status(200).send({ message: 'El user se ha actualizado correctamente' });
    /*  res.send("El user se ha actualizado correctamente"); */
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido encontrar el user con el id seleccionado',
    });
  }
};
// Delete a User with the specified id in the request
exports.destroy = async (req, res) => {
  const mockData = {
    name: 'prueba2',
    apellidos: 'pruebaApellido2',
    password: 'prueba2',
  };
  try {
    const id = req.params.id;
    const user = await User.destroy({
      where: { id: id },
    });
    res.status(200).send({
      message: 'El user se ha eliminado correctamente',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido encontrar el user con el id seleccionado',
    });
  }
};
