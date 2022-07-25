/* Controladores */

const { User } = require('../models');

/* Commerce.getEventos(4) */
exports.index = async (req, res) => {
  /* selectByFk(req,res,Event,"comercio_id","evento_id") */
  models = await User.getEventos(req.params.id);
  res.send(models);
};
exports.delete = async (req, res) => {
  /* selectByFk(req,res,Event,"comercio_id","evento_id") */
  models = await User.deleteInscriptionsByUser(req.params.id);
  res.send(models);
};
