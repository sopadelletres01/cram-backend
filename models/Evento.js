/* Modelo */
const {sequelize, Sequelize}= require('./db')
const Evento = sequelize.define("evento", {
    
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true
    },
    nombre:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull: false,
    },
    edicion:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull: false,
    },
    lugar:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    fecha_inicio:{
        type:Sequelize.DATEONLY,
        allowNull: false
    },
    fecha_finalizacion:{
        type:Sequelize.DATEONLY,
        allowNull: false
    },
    src:{
        type:Sequelize.STRING,
        allowNull: true,
        defaultValue: "https://res.cloudinary.com/dhdbik42m/image/upload/v1652897103/no-hay-icono-de-foto-estilo-contorno-delgado-la-colecci_C3_B3n-iconos-se_C3_B1as-del-centro-comercial-ning_C3_BAn-fotos-para-dise_C3_B1o-147583922_xe4gzv.jpg"

    },
    descripcion:{
        type:Sequelize.STRING,
        allowNull: true
    }},{
        timestamps: false,
        
    });
Evento.getEventosCurrent=async function(req){
    const query=` SELECT concat( nombre , " ", edicion), id, lugar, nombre, edicion,fecha_inicio
    FROM eventos
    WHERE fecha_inicio>=current_date()`

    const result = await sequelize.query(query,{
        model: Evento, mapToModel: true,
        nest: true,
        raw: true,
        type: sequelize.QueryTypes.SELECT 

    })
    console.log("RESULT",result)
    return result;
}
Evento.getComerciosByEvento=async function(req){
    const {id} = req.params
    const query=` SELECT c.nombre, c.id, c.src, c.poblacion   FROM (( eventos as e   INNER JOIN promociones as p ON p.evento_id= e.id   INNER JOIN comercios as c ON c.id=p.comercio_id   ))   WHERE e.id=${id} ;`

    const result = await sequelize.query(query,{
        model: Evento, mapToModel: true,
        nest: true,
        raw: true,
        type: sequelize.QueryTypes.SELECT 

    })
    console.log("RESULT",result)
    return result;
}

Evento.getPromocionesByEvento=async function(req){
    const {id} = req.params
    const query=`SELECT p.titulo, p.descripcion, p.src, p.id
    FROM (( cram.eventos as e   
    INNER JOIN cram.promociones as p ON p.evento_id= e.id ))  
    WHERE e.id=${id} ;`

    const result = await sequelize.query(query,{
        model: Evento, mapToModel: true,
        nest: true,
        raw: true,
        type: sequelize.QueryTypes.SELECT 

    })
    console.log("RESULT",result)
    return result;
}

module.exports = Evento;
   
