const { sequelize, Sequelize } = require('./db')
const Company = sequelize.define('companies',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
            allowNull:false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull:false,
        },
        adress: {
            type: Sequelize.STRING,
            allowNull:false,
        },
        idUser: {
            type: Sequelize.INTEGER,
            allowNull:false,
        }
    }, {
        timestamps: true,
        freezeTableName: true,
    })
module.exports = Company;