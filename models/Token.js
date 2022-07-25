const { sequelize, Sequelize } = require('./db');

const Token = sequelize.define(
  'tokens',
  {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    idUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    expire_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Token;
