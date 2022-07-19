const {sequelize, Sequelize}= require('./db')

const Token = sequelize.define("token", {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey:true
  },
  usuario_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  fecha_expiracion: {
    type: Sequelize.DATEONLY,
    allowNull: true,
    defaultValue: Date.now()
  },
},{
  timestamps: false
});
module.exports= Token;
