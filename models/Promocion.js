/* Modelo */
const { sequelize, Sequelize } = require('./db')

const Promocion = sequelize.define("promociones", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    titulo:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    token:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    descripcion:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    fecha_inicio:{
        type:Sequelize.DATEONLY,
        allowNull: false,
    },
    fecha_expiracion:{
        type:Sequelize.DATEONLY,
        allowNull: false
    },
    comercio_id:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    evento_id:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    src:{
        type:Sequelize.INTEGER,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true,
});

module.exports = Promocion
//Promocion.findAll().then(data=> console.log("Promocion",data))