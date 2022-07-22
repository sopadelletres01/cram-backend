const { sequelize, Sequelize } = require('./db');
const Activity = sequelize.define('activities',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
      allowNull: false,
    },
    name:{
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
}
)