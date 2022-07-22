const { sequelize, Sequelize } = require('./db')
const Province = sequelize.define("provinces",
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
            allowNull: false
        },
    }, {
        timestamps:false,
        freezeTableName: true,
    })
module.exports = Province;