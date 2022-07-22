const { sequelize ,Sequelize } =require('./db')
const User_Promo=sequelize.define('user_promo',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true

    },
    idUser:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    idPromotion:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
},{
    timestamps: true,
    freezeTableName:true,
    });

    // UserPromo.exist=async function (id_usuario, id_promocion){
    //     const query=` SELECT * FROM user_promo WHERE id_usuario=${id_usuario} and id_promocion=${id_promocion}`
    //     try{ 
    //         const result = await sequelize.query(query, 
    //             { 
    //                 model: UserPromo, mapToModel: true,
    //                 nest: true,
    //                 raw: true,
    //                 type: sequelize.QueryTypes.SELECT 
    //             })
    //             console.log("RESULT",result)
    //          return result;
    //        }catch(e){
    //            console.log(e)
    //        }
    // }
    module.exports = UserPromo;