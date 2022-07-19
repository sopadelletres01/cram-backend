const Usuario = require("./Usuario")
const Comercio = require("./Comercio")
const Promocion = require("./Promocion")
const Evento = require("./Evento")
const {sequelize} = require("./db")
console.log('8=====D')

// Relació Comercio - Promocion
Comercio.hasMany(Promocion, {
    foreignKey: 'id'
})
Promocion.belongsTo(Comercio, {
    foreignKey: 'comercio_id'
})

// Relació Promocion - Evento
Promocion.belongsTo(Evento, {
    foreignKey: 'evento_id'
})
Evento.hasMany(Promocion, {
    foreignKey: 'id'
})


// Relació Comercio > Promocion > Evento
// Comercio.belongsToMany(Evento, { through: Promocion })
// Evento.belongsToMany(Comercio, { through: Promocion })

// Relació Usuario > Inscripcion > Evento
//Usuario.belongsToMany(Evento, { through: 'inscripciones' })


