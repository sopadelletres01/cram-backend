/* Controladores */

/* Controlador */
const {Sequelize,sequelize} = require("../models/db");
const {User,Token, Rol} = require("../models");
const { selectByFk, createByFk, deleteByFk, updateByFk ,getIdByFk}= require("./helpers");
const Op= Sequelize.Op;

exports.index=async( req, res)=>{
    selectByFk(req,res,Promocion,"evento_id")
};

exports.store = ( req, res)=>{
        /* const promocion = await Promocion.build({...req.body, comercio_id:req.params.id}); */
        createByFk(req,res,Promocion,"evento_id");
};
exports.show=async (req, res)=>{
  getIdByFk(req,res,Promocion,'evento_id','id')
};
exports.update = async (req, res)=>{
    updateByFk(req, res,Promocion,'evento_id', 'id')
};
exports.destroy = async ( req, res)=>{
    deleteByFk(req,res,Promocion,'evento_id','id');
   
};