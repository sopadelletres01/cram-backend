const { Sequelize, sequelize } = require('../models/db');
const { UserPromo } = require('../models');
const { generateQR, generateQRConsole } = require('./helpers/generateQr');
const Op = Sequelize.Op;

exports.generate = async (req, res) => {
  try {
    //Faltaria validad el qr con una especie de token o formulario para que solo lo puedan validar los usuarios comerciales
    const { idPromo, idUser } = req.params;
    const url = `http://${req.headers.host}/api/QR/validate/${idUser}/${idPromo}`;
    const qr = await generateQR(url);
    console.log('QR', qr);
    res.status(200).send(qr);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.message || 'no hemos podido coger las Promotions de este participante.',
    });
  }
};

exports.validate = async (req, res) => {
  try {
    //Faltaria validad el qr con una especie de token o formulario para que solo lo puedan validar los usuarios comerciales
    const { idPromo, idUser } = req.params;

    const promo = await UserPromo.exist(idUser, idPromo);
    console.log(promo);
    if (promo.length !== 0) {
      console.log('hay cositas');
      res.status(400).send({message: "La promocion ya ha sido validada"});
    } else {
      console.log('vaciooooooooooooooooooooooooooooooooo');
      const date = new Date()
      console.log("DATE",date)
      const validarPromo = await UserPromo.create({idPromotion:idPromo,idUser, date});
      console.log(validarPromo)
      res.status(200).send({message: "La promocion ha sido validada correctamente"});
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({
      message: 'no se ha podido validar la promocion. Puede que el QR no sea correcto o esté corrupto',
    });
  }
};

exports.getPromoUsedByUser = async (req, res) => {
  try {
    const promo = await UserPromo.findAll({
      where: {
        idUser: req.params.id,
      },
    });
    res.status(200).send(promo);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.message || 'no hemos podido coger las Promotions de este participante.',
    });
  }
};
exports.thisPromoExist = async (req, res) => {
  try {
    console.log('id del user', req.params.id, 'ID de la Promotion', req.params.nid);
    const promo = await UserPromo.exist(req.params.id, req.params.nid);

    if (res.status(200)) {
      if (promo.length !== 0) {
        console.log('hay cositas');
        res.send(promo);
      } else {
        console.log('vaciooooooooooooooooooooooooooooooooo');
        res.send(null);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.message || 'no hemos podido coger las Promotions de este participante.',
    });
  }
};

exports.show = async (req, res) => {
  try {
    const res = await UserPromo.build(req.body);
    await validarPromo.save();
    res.send(validarPromo);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido crear esta validación',
    });
  }
};

exports.store = async (req, res) => {
  try {
    const validarPromo = await UserPromo.build(req.body);
    await validarPromo.save();
    res.send(validarPromo);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message || 'No hemos podido crear esta validación',
    });
  }
};
