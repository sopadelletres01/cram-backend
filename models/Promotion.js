/* Modelo */
const { sequelize, Sequelize } = require('./db');
const Event=require('../models/Event')

const Promotion = sequelize.define(
  'promotions',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    final_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    idCommerce: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idRanking: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idEvent: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    photo: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
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

Promotion.getPromotionsAll = async function (idEvento) { 
  const query = `SELECT p.name, p.description, p.photo, p.id, p.idEvent, e.free, e.name as event_name, e.description as event_description, c.name, c.town,c.adress, c.url,c.photo
  FROM ((promotions as p
  INNER JOIN events as e ON e.id=p.idEvent
  INNER JOIN commerces as c ON c.id=idCommerce))
  WHERE p.idEvent=${id}`;
  const result = await sequelize.query(query, {
    model: Promotion,
    mapToModel: true,
    nest: true,
    raw: true,
    type: sequelize.QueryTypes.SELECT,
  });
  return result;

}

module.exports = Promotion;
//Promotion.findAll().then(data=> console.log("Promotion",data))
