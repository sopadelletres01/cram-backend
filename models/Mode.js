const { sequelize, Sequelize } = require('./db')
const Mode = sequelize.define('Mode',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            fiel:'id'
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        max_age: {
            type: Sequelize.INTEGER,
            validate: {
                max:100,
                min:1
            }
        },
        min_age: {
            type: Sequelize.INTEGER,
            validate: {
                max:100,
                min:1
            }
        }
    }
    , {
        timestamps: true,
        freezeTableName: true,
    })