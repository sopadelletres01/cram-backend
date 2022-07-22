/* Modelo */
const { sequelize, Sequelize } = require("./db");
const Commerce = sequelize.define(
  "commerce",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    CIF: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    town: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      validate: {
        min: "9",
        max: "9",
      },
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: false,
    },
    admin: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ccaaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//Commerce.hasMany(Promotion, {foreignKey: 'id'})

// Commerce.hasMany(Event, { through: 'Promotions', /* options */ });
// Commerce.getEventos = async function (id) {
//   const query = `select e.nombre, e.edicion, e.fecha_inicio, p.descripcion, p.comercio_id
//     from eventos as e, promociones as p
//     where p.comercio_id=${id} and p.evento_id=e.id`;

//   const result = await sequelize.query(query, {
//     model: Commerce,
//     mapToModel: true,
//     nest: true,
//     raw: true,
//     type: sequelize.QueryTypes.SELECT,
//   });
//   console.log("RESULT", result);
//   return result;
// };
// Commerce.getNif = async function () {
//   const query = await `select nif from comercios;`;
//   const result = await sequelize.query(query, {
//     model: Commerce,
//     mapToModel: true,
//     nest: true,
//     raw: true,
//     type: sequelize.QueryTypes.SELECT,
//   });
//   console.log("RESULT", result);
//   return result;
// };
// Commerce.searchComercio = async function (nif) {
//   const query = `select * from comercios where nif=${nif};`;
//   const result = await sequelize.query(query, {
//     model: Commerce,
//     mapToModel: true,
//     nest: true,
//     raw: true,
//     type: sequelize.QueryTypes.SELECT,
//   });
//   console.log("RESULT", result);
//   return result;
// };

module.exports = Commerce;
