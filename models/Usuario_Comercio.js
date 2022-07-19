const {sequelize, Sequelize}=require('./db')
const Usu_Comercio =sequelize.define('usuario_comercio',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    usuario_id:{
        type:Sequelize.INTEGER,
        allowNull: false

    },
    comercio_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    }},{
        timestamps:false
    }
);
module.exports = Usu_Comercio;