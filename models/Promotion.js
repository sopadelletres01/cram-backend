/* Modelo */
const { sequelize, Sequelize } = require('./db');

const Promotion = sequelize.define(
  'promotions',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fecha_inicio: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    fecha_expiracion: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    comercio_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    evento_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    src: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Promotion.getPromotionsByFreeEvents = async function (req) {
  const query = `SELECT distinct p.name, p.description, p.photo, p.id, p.idEvent, e.free, e.name as event_name, e.description as event_description
  FROM (( events as e
  INNER JOIN promotions as p ON e.free = 1 AND e.id = p.idEvent ) );`;

  const result = await sequelize.query(query, {
    model: Event,
    mapToModel: true,
    nest: true,
    raw: true,
    type: sequelize.QueryTypes.SELECT,
  });
  return result;
};

module.exports = Promotion;
//Promotion.findAll().then(data=> console.log("Promotion",data))
