const {sequelize, Sequelize}= require('./db')

  const Rol = sequelize.define("rols", {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        isin:[['participant','owner','admin']],
      }
    },
  },{
    timestamps: false,
    freezeTableName: true,
  });

  // Rol.findByName = async function(name) {
  //   return await this.findOne({
  //     where: {
  //         nombre: {
  //           [Sequelize.Op.eq]: name,
  //         },
  //     }
  //   });
  // };

  module.exports= Rol;