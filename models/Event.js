/* Modelo */
const { sequelize, Sequelize } = require('./db');
const Event = sequelize.define(
  'events',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    edition: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    town: {
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
    photo: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:
        'https://res.cloudinary.com/dhdbik42m/image/upload/v1652897103/no-hay-icono-de-foto-estilo-contorno-delgado-la-colecci_C3_B3n-iconos-se_C3_B1as-del-centro-comercial-ning_C3_BAn-fotos-para-dise_C3_B1o-147583922_xe4gzv.jpg',
    },
    idActivity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    free: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    max_participant: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idCompany: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    province: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    adress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
Event.getEventsCurrentFree = async function (req) {
  const query=` SELECT concat( name , " ", edition) *
      FROM events
      WHERE start_date>=current_date()`
  
      const result = await sequelize.query(query,{
          model: Event, mapToModel: true,
          nest: true,
          raw: true,
          type: sequelize.QueryTypes.SELECT
  
      })
      console.log("RESULT",result)
      return result;
  
}
// Event.getEventosCurrent=async function(req){
//     const query=` SELECT concat( nombre , " ", edicion), id, lugar, nombre, edicion,fecha_inicio
//     FROM eventos
//     WHERE fecha_inicio>=current_date()`

//     const result = await sequelize.query(query,{
//         model: Event, mapToModel: true,
//         nest: true,
//         raw: true,
//         type: sequelize.QueryTypes.SELECT

//     })
//     console.log("RESULT",result)
//     return result;
// }
// Event.getComerciosByEvento=async function(req){
//     const {id} = req.params
//     const query=` SELECT c.nombre, c.id, c.src, c.poblacion   FROM (( eventos as e   INNER JOIN promociones as p ON p.evento_id= e.id   INNER JOIN comercios as c ON c.id=p.comercio_id   ))   WHERE e.id=${id} ;`

//     const result = await sequelize.query(query,{
//         model: Event, mapToModel: true,
//         nest: true,
//         raw: true,
//         type: sequelize.QueryTypes.SELECT

//     })
//     console.log("RESULT",result)
//     return result;
// }

// Event.getPromocionesByEvento=async function(req){
//     const {id} = req.params
//     const query=`SELECT p.titulo, p.descripcion, p.src, p.id
//     FROM (( cram.eventos as e
//     INNER JOIN cram.promociones as p ON p.evento_id= e.id ))
//     WHERE e.id=${id} ;`

//     const result = await sequelize.query(query,{
//         model: Event, mapToModel: true,
//         nest: true,
//         raw: true,
//         type: sequelize.QueryTypes.SELECT

//     })
//     console.log("RESULT",result)
//     return result;
// }

module.exports = Event;
