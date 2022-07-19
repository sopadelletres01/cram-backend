const {Sequelize,sequelize} = require("../models/db");
const {UserPromo} = require("../models");
const Op= Sequelize.Op;


exports.getPromoUsedByUser= async ( req, res)=>{
    try{
        const res= await UserPromo.findAll({
            where:{
                id_usuario: req.params.id, 
              
            }
        });
        res.status(200).send(res);

    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 
                e.message || "no hemos podido coger las promociones de este participante."
        })

    }
}
exports.thisPromoExist= async ( req, res)=>{
    try{
        console.log("id del usuario",req.params.id,"ID de la promocion",req.params.nid)
        const promo= await UserPromo.exist(req.params.id, req.params.nid)
        
        if(res.status(200)){
            if(promo.length!==0){
                console.log('hay cositas')
                res.send(promo)
            }else{
                console.log("vaciooooooooooooooooooooooooooooooooo")
                res.send(null)
            }
            
        }
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 
                e.message || "no hemos podido coger las promociones de este participante."
        })

    }
}

exports.show = async( req, res)=>{
    try{
        const res = await UserPromo.build(req.body);
        await validarPromo.save();
        res.send(validarPromo);
    }catch (error) {
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido crear esta validación"
        });
    }
};

exports.store = async( req, res)=>{
    try{
        const validarPromo = await UserPromo.build(req.body);
        await validarPromo.save();
        res.send(validarPromo);
    }catch (error) {
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido crear esta validación"
        });
    }
};
