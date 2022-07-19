/* Controladores */

/* Controlador */

const {Comercio } = require("../models");

/* Comercio.getEventos(4) */
exports.index=async( req, res)=>{
    /* selectByFk(req,res,Evento,"comercio_id","evento_id") */
    models = await Comercio.getEventos(req.params.id);
    res.send(models);
};
