const { sequelize, Sequelize } = require('./db')
const Ranking = sequelize.define('rankings',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn:[['finisher','1','2','3','abandoned','participante']]
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    })