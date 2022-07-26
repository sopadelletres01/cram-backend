const { sequelize, Sequelize } = require('./db');
const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      validate: {
        isBefore: '2003-12-31',
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 9,
      },
    },
    adress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cp: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        min: 4,
        max: 4,
      },
    },
    town: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    country: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    idRole: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 64,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      },
    },
    dni: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i,
      },
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue:
        'https://res.cloudinary.com/dhdbik42m/image/upload/v1653657315/fddc4mhikp5coxew116c.jpg',
      validate: {
        isUrl: true,
      },
    },
  },
  {
    timestamps: false,
  }
);
  User.getInscriptions = async function (req) {
    const id = req.params.id;
  const query = ` SELECT e.name, e.adress, e.description, e.edition, e.photo, e.start_date, e.final_date, i.idUser, i.idEvent
  FROM inscriptions as i, events as e
  WHERE i.idUser=${id} and i.idEvent=e.id`;

  const result = await sequelize.query(query, {
    model: User,
    mapToModel: true,
    nest: true,
    raw: true,
    type: sequelize.QueryTypes.SELECT,
  });
  console.log("RESULT", result);
  return result;
};
User.getPromotions = async function (req) {
  const id = req.params.id;
  const query = `SELECT e.name as event_name, p.start_date,p.final_date,p.description, p.name, p.id, i.idEvent,p.photo,c.name as commerce_name, c.town,p.idCommerce
  FROM (( users as u
  INNER JOIN inscriptions as i ON i.idUser= u.id
  INNER JOIN events as e ON e.id=i.idEvent
  INNER JOIN promotions as p ON p.idEvent=e.id
  INNER JOIN commerces as c ON c.id=p.idCommerce))
  WHERE u.id=${id};`;

  const result = await sequelize.query(query, {
    model: User,
    mapToModel: true,
    nest: true,
    raw: true,
    type: sequelize.QueryTypes.SELECT,
  });
  console.log("RESULT", result);
  return result;
};

User.getPromo = async function (req) {
  const { id } = req.params;
  const query = `SELECT e.name as event_name, e.description as event_description,  e.photo as event_photo, p.name, p.start_date,p.final_date,p.description,  p.id ,p.photo , c.name as commerce_name, c.town as commerce_town,p.idCommerce,c.photo as photo_commerce,p.idEvent
  FROM (( promotions as p
  INNER JOIN events as e ON e.id=p.idEvent
  INNER JOIN commerces as c ON c.id=p.idCommerce))
  WHERE p.id=${id} ;`;

  const result = await sequelize.query(query, {
    model: User,
    mapToModel: true,
    raw: true,
    type: sequelize.QueryTypes.SELECT,
  });
  console.log("RESULT", result[0]);
  return result[0];
};

User.getPromotionsExpiredByUser = async function (req) {
  //REVISAR EL   WHERE u.id=${id} and p.fecha_expiracion < curdate()`
  const id = req.params.id;
  const query = `SELECT e.name, p.start_date,p.final_date,p.description, p.name, p.id, i.idEvent,p.photo,c.name, c.town,p.idCommerce
  FROM (( users as u
  INNER JOIN inscriptions as i ON i.idUser= u.id
  INNER JOIN events as e ON e.id=i.idEvent
  INNER JOIN promotions as p ON p.idEvent=e.id
  INNER JOIN commerces as c ON c.id=p.idCommerce))
  WHERE u.id=${id} and p.final_date < curdate()`;

  const result = await sequelize.query(query, {
    model: User,
    mapToModel: true,
    nest: true,
    raw: true,
    type: sequelize.QueryTypes.SELECT,
  });
  console.log("RESULT", result);
  return result;
};
// User.getPromotionsCurrentByUser = async function (req) {
//   const id = req.params.id;
//   const query = `SELECT e.name, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.title, i.id_evento,p.src,c.name, c.town,p.comercio_id
//   FROM (( users as u
//   INNER JOIN Inscriptions as i ON i.id_usuario= u.id
//   INNER JOIN events as e ON e.id=i.id_evento
//   INNER JOIN Promotions as p ON p.evento_id=e.id
//   INNER JOIN commerces as c ON c.id=p.comercio_id))
//   WHERE u.id=${id} and p.fecha_expiracion > curdate()`;
//   const result = await sequelize.query(query, {
//     model: User,
//     mapToModel: true,
//     nest: true,
//     raw: true,
//     type: sequelize.QueryTypes.SELECT,
//   });
//   console.log("RESULT", result);
//   return result;
// };

// User.getPromotionsById = async function (req) {
//   const id = req.params.id;
//   const query = `SELECT e.name, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.title, i.id_evento,p.src
//   FROM (( users as u
//   INNER JOIN Inscriptions as i ON i.id_usuario= u.id
//   INNER JOIN events as e ON e.id=i.id_evento
//   INNER JOIN Promotions as p ON p.evento_id=e.id))
//   WHERE u.id=${id}`;

//   const result = await sequelize.query(query, {
//     model: User,
//     mapToModel: true,
//     nest: true,
//     raw: true,
//     type: sequelize.QueryTypes.SELECT,
//   });
//   console.log("RESULT", result);
//   return result;
// };
// User.deleteInscriptionsByUser = async function (req) {
//   const id = req.params.id;

//   const query = `DELETE FROM Inscriptions WHERE id_usuario=${id};`;
//   const result = await sequelize.query(query, {
//     model: User,
//     mapToModel: true,
//     nest: true,
//     raw: true,
//     type: sequelize.QueryTypes.DELETE,
//   });
//   console.log("RESULT", result);
//   return result;
// };
// User.getPromoComer = async function (dni, id) {
//   console.log("DNI", dni);
//   console.log("ID ", id);

//   const query = `SELECT u.id, p.id as id_Promotion, u.name, u.email,u.telefono, u.apellidos, u.dni, c.name, e.name, e.edicion, p.title
//     FROM (( users as u
//     INNER JOIN Inscriptions as i ON i.id_usuario= u.id
//     INNER JOIN events as e ON e.id=i.id_evento
//     INNER JOIN Promotions as p ON p.evento_id=e.id
//   INNER JOIN commerces as c ON c.id=${id}))
//     WHERE u.dni='${dni}' and p.fecha_expiracion< curdate() ;`;
//   try {
//     const result = await sequelize.query(query, {
//       model: User,
//       mapToModel: true,
//       nest: true,
//       raw: true,
//       type: sequelize.QueryTypes.SELECT,
//     });
//     console.log("RESULT", result);
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// };

module.exports = User;
