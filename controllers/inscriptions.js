const { Sequelize, sequelize } = require('../models/db');
const { Inscription } = require('../models');

exports.index = async (req, res) => {
  console.log('query', req.query);

  try {
    if (req.query.active === true) {
      const ins = await Inscription.getEventosCurrent();
      console.log('Eeeeee', Inscriptions);
      return res.status(200).send(Inscriptions);
    }
    const Inscriptions = await Inscription.findAll();
    console.log('Inscriptions', Inscriptions);
    res.send(Inscriptions);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido listar los inss',
    });
  }
};
exports.store = async (req, res) => {
  try {
    console.log("Entra en ins",req.body)
    const ins = await Inscription.build(req.body);
    await ins.save();
    console.log("INS",ins)
    res.send(ins);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido  crear el ins , revisa los datos introducidos',
    });
  }
};
exports.show = async (req, res) => {
  console.log('ENTRAAA');

  try {
    const id = req.params.id;
    const ins = await Inscription.findOne({ where: { id: id } });
    res.send(ins);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido  encontrar el ins que has seleccionado',
    });
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const ins = await Inscription.update(req.body, { where: { id: id } });
    console.log('id', id);
    console.log('ins', ins);
    res.status(200).send('el ins se ha actualizado correctamente');
  } catch (error) {
    res.status(404).send({
      message: error.message || 'No hemos podido encontrar el ins que quieres modificar',
    });
  }
};
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const ins = await Inscription.destroy({
      where: { id: id },
    });
    console.log(ins);
    res.status(202).send({
      message: 'Se ha borrado el ins correctament',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido encontrat el Event que has selecionado',
    });
  }
};
