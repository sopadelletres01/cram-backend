const { sequelize, Sequelize } = require('./db')
const Province = require("provinces",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        idComunity: {
            type: Sequelize.INTEGER,
            allowNull:false
        }

    })
module.exports = Province;