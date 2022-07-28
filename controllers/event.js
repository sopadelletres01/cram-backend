/* Controlador */
const { Sequelize, sequelize } = require('../models/db');
const { Event } = require('../models');
const { uploadFile } = require('./file');
const Op = Sequelize.Op;

exports.getEvents = async (req, res) => {
  try {
    console.log('tu puta madre',req.query)
    let events;
    if (req.query.free === 'true' && req.query.active === 'true') {
      events = await Event.getEventsCurrentFree();
      console.log("EVENTOS NO CADUCADOS", events);
      return res.status(200).send(events);
    }
    events = await Event.findAll();
    console.log(events)
    return res.status(200).send(events);
  } catch (e) {
    res.status(500).send({
      message: e.message || "No hemos podido listar los eventos",
    });
  }
};
exports.getEventoActive = async (req, res) => {
  try {
    const events = await Event.getEventosCurrent();
    console.log('EVENTOS NO CADUCADOS', events);
    res.status(200).send(events);
  } catch (e) {
    res.status(500).send({
      message: e.message || 'No hemos podido listar los events',
    });
  }
};
exports.getComercios = async (req, res) => {
  try {
    const commerces = await Event.getComerciosByEvento(req);
    console.log('COMERCIOS DE LOS EVENTOS', commerces);
    res.status(200).send(commerces);
  } catch (e) {
    res.status(500).send({
      message: e.message || 'No hemos podido listar los events',
    });
  }
};

exports.getPromotions = async (req, res) => {
  try {
    const Promotions = await Event.getPromotionsByEvento(req);
    console.log('Promotions DE LOS EVENTOS', Promotions);
    res.status(200).send(Promotions);
  } catch (e) {
    res.status(500).send({
      message: e.message || 'No hemos podido listar los events',
    });
  }
};
exports.index = async (req, res) => {
  console.log('query', req.query);

  try {
    if (req.query.active === 'true') {
      const events = await Event.getEventosCurrent();
      console.log('EVENTOS NO CADUCADOS', events);
      return res.status(200).send(events);
    }
    const events = await Event.findAll();
    console.log('events', events);
    res.send(events);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido listar los events',
    });
  }
};
exports.store = async (req, res, next) => {
  console.log('body', req.body);
  console.log('file', req.file);
  console.log('ENTRAAA');
  try {
    //subir fichero al cloudinari y recoger el src y añadirlo al evento que es el cloudinari
    //req
    let image = await uploadFile(req, res, next);
    console.log('IMAGENNNNN funciona', image);
    const evento = await Event.build({ ...req.body, src: image.url });
    console.log('eventito, eventito quien es el mas bonito', evento);
    await evento.save();
    res.status(200).send(evento);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido  crear el evento , revisa los datos introducidos',
    });
  }
  next();
};
exports.show = async (req, res) => {
  console.log('ENTRAAA');

  try {
    const id = req.params.id;
    const evento = await Event.findOne({ where: { id: id } });
    console.log(evento)
    res.status(200).send(evento);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido  encontrar el evento que has seleccionado',
    });
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const evento = await Event.update(req.body, { where: { id: id } });
    console.log('id', id);
    console.log('evento', evento);
    res.status(200).send('el evento se ha actualizado correctamente');
  } catch (error) {
    res.status(404).send({
      message: error.message || 'No hemos podido encontrar el evento que quieres modificar',
    });
  }
};
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const evento = await Event.destroy({
      where: { id: id },
    });
    console.log(evento);
    res.status(202).send({
      message: 'Se ha borrado el evento correctament',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'No hemos podido encontrat el Event que has selecionado',
    });
  }
};
