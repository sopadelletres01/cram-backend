const { sequelize, Sequelize } = require("./db");
const Inscription = sequelize.define(
  "inscripcions",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field:'id'
    },
    idEvent: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.timestamps,
      allowNull: false,
    },
    idMode: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Inscription;
