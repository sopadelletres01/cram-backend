/* Controladores */

/* Controlador */

const { Commerce } = require("../models");

/* Commerce.getEventos(4) */
exports.index = async (req, res) => {
  /* selectByFk(req,res,Event,"comercio_id","evento_id") */
  models = await Commerce.getEventos(req.params.id);
  res.send(models);
};
