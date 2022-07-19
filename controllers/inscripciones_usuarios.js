
/* Controladores */


const {User} = require("../models");

/* Comercio.getEventos(4) */
exports.index=async( req, res)=>{
    /* selectByFk(req,res,Evento,"comercio_id","evento_id") */
    models = await User.getEventos(req.params.id);
    res.send(models);
};
exports.delete=async( req, res)=>{
    /* selectByFk(req,res,Evento,"comercio_id","evento_id") */
    models = await User.deleteInscripcionesByUser(req.params.id);
    res.send(models);
};
