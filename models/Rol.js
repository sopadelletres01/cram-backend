const {sequelize, Sequelize}= require('./db')

  const Rol = sequelize.define("roles", {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    nombre: {
      type: Sequelize.STRING,
    },
  },{
    timestamps: false,
    freezeTableName: true,
  });

  Rol.findByName = async function(name) {
    return await this.findOne({
      where: {
          nombre: {
            [Sequelize.Op.eq]: name,
          },
      }
    });
  };

  module.exports= Rol;