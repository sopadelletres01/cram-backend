const {sequelize, Sequelize}= require('./db')
const Usuario = sequelize.define("usuario", {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apellidos: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  telefono: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate:{
      isEmail: true
    }
  },
  fecha_nacimiento: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  dni: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  localidad:{
    type:Sequelize.STRING,
    allowNull: true
  },
  codigo_postal:{
    type:Sequelize.INTEGER,
    allowNull: true
  },
  rol_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue:1
  },
  avatar_src: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "https://res.cloudinary.com/dhdbik42m/image/upload/v1652897103/no-hay-icono-de-foto-estilo-contorno-delgado-la-colecci_C3_B3n-iconos-se_C3_B1as-del-centro-comercial-ning_C3_BAn-fotos-para-dise_C3_B1o-147583922_xe4gzv.jpg"
  },
  token_activado:{
    type: Sequelize.BOOLEAN,
  }
},{
  timestamps: false
});
Usuario.getInscripciones= async function(req){
  const id= req.params.id;
  const query= ` SELECT e.nombre, e.lugar, e.descripcion, e.edicion, e.src, e.fecha_inicio, e.fecha_finalizacion, i.id_usuario, i.id_evento
  FROM inscripciones as i, eventos as e
  WHERE i.id_usuario=${id} and i.id_evento=e.id`

  const result = await sequelize.query(query, 
      { 
        model: Usuario, mapToModel: true,
        nest: true,
        raw: true,
        type: sequelize.QueryTypes.SELECT 
      })
      console.log("RESULT",result)
    return result;
  
}
Usuario.getPromociones= async function(req){
  const id = req.params.id;
  const query=`SELECT e.nombre as evento_nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, p.id, i.id_evento,p.src,c.nombre as comercio_nombre, c.poblacion,p.comercio_id,p.src
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id 
  INNER JOIN comercios as c ON c.id=p.comercio_id))
  WHERE u.id=${id}`

  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      nest: true,
      raw: true,
      type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result)
  return result;
}

Usuario.getPromo= async function(req){
  const {id,pid} = req.params;
  const query=`SELECT e.nombre as evento_nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, p.id, i.id_evento,p.src,c.nombre as comercio_nombre, c.poblacion,p.comercio_id,p.src
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id 
  INNER JOIN comercios as c ON c.id=p.comercio_id))
  WHERE u.id=${id} and p.id=${pid}
  LIMIT 1 `

  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      raw: true,
      type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result[0])
  return result[0];
}


Usuario.getPromocionesExpiredByUser= async function(req){
  //REVISAR EL   WHERE u.id=${id} and p.fecha_expiracion < curdate()`
  const id=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, p.id, i.id_evento,p.src,c.nombre, c.poblacion,p.comercio_id
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id 
  INNER JOIN comercios as c ON c.id=p.comercio_id))
  WHERE u.id=${id} and p.fecha_expiracion < curdate()`

  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      nest: true,
      raw: true,
      type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result)
  return result;
}
Usuario.getPromocionesCurrentByUser= async function(req){
  const id=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, i.id_evento,p.src,c.nombre, c.poblacion,p.comercio_id
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id 
  INNER JOIN comercios as c ON c.id=p.comercio_id))
  WHERE u.id=${id} and p.fecha_expiracion > curdate()`
  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      nest: true,
      raw: true,
      type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result)
  return result;
}

Usuario.getPromocionesById= async function(req){
  const id=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, i.id_evento,p.src
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id))
  WHERE u.id=${id}`

  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      nest: true,
      raw: true,
      type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result)
  return result;
}
Usuario.deleteInscripcionesByUser= async function(req){
  const id = req.params.id

  const query=`DELETE FROM inscripciones WHERE id_usuario=${id};`
  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      nest: true,
      raw: true,
      type: sequelize.QueryTypes.DELETE
    })
    console.log("RESULT",result)
  return result;
  }
  Usuario.getPromoComer=async function(dni, id){
    console.log('DNI', dni)
    console.log('ID ', id)

    const query= `SELECT u.id, p.id as id_promocion, u.nombre, u.email,u.telefono, u.apellidos, u.dni, c.nombre, e.nombre, e.edicion, p.titulo
    FROM (( usuarios as u
    INNER JOIN inscripciones as i ON i.id_usuario= u.id
    INNER JOIN eventos as e ON e.id=i.id_evento
    INNER JOIN promociones as p ON p.evento_id=e.id
  INNER JOIN comercios as c ON c.id=${id}))
    WHERE u.dni='${dni}' and p.fecha_expiracion< curdate() ;`
   try{ 
    const result = await sequelize.query(query, 
        { 
            model: Usuario, mapToModel: true,
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


module.exports=Usuario