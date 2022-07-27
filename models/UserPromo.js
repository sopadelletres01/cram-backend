const { sequelize, Sequelize } = require('./db');
const UserPromo = sequelize.define(
  'user_promo',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idPromotion: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

UserPromo.exist=async function (idUser, idPromotion){
    const query=` SELECT * FROM user_promo WHERE idUser=${idUser} and idPromotion=${idPromotion}`
    try{
        const result = await sequelize.query(query,
            {
                model: UserPromo, mapToModel: true,
                nest: true,
                raw: true,
                type: sequelize.QueryTypes.SELECT
            })
            console.log("RESULT",result)
         return result;
       }catch(e){
           console.log(e)
       }
}
module.exports = UserPromo;
