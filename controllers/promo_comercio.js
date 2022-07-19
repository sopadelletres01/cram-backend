/* Controladores */

/* Controlador */
const {Sequelize,sequelize} = require("../models/db");
const {Promocion} = require("../models");
const { selectByFk, createByFk, deleteByFk, updateByFk ,getIdByFk}= require("./helpers");
const Op= Sequelize.Op;

exports.index=async( req, res)=>{
    try{
        const promos = await selectByFk(req,res,Promocion,"comercio_id")
        console.log("PROMOS",promos)
        res.status(200).send(promos)
        
    }catch(e){
        res.status(500).send({message:e})
    }

};

exports.store = ( req, res)=>{
        /* const promocion = await Promocion.build({...req.body, comercio_id:req.params.id}); */
        createByFk(req,res,Promocion,"comercio_id");
};
exports.show=async (req, res)=>{
  getIdByFk(req,res,Promocion,'comercio_id','id')
};
exports.update = async (req, res)=>{
    updateByFk(req, res,Promocion,'comercio_id', 'id')
};
exports.destroy = async ( req, res)=>{
    deleteByFk(req,res,Promocion,'comercio_id','id');
   
};