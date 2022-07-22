const { sequelize, Sequelize } = require("./db");
const Inscription = sequelize.define("inscriptions",
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

    idMode: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Inscription;
