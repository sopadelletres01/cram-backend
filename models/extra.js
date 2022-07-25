// const User = require("./User");
// const Commerce = require("./Commerce");
// const Promotion = require("./Promotion");
// const Event = require("./Event");
// const { sequelize } = require("./db");
// console.log("8=====D");

// // Relació Commerce - Promotion
// Commerce.hasMany(Promotion, {
//   foreignKey: "id",
// });
// Promotion.belongsTo(Commerce, {
//   foreignKey: "comercio_id",
// });

// // Relació Promotion - Event
// Promotion.belongsTo(Event, {
//   foreignKey: "evento_id",
// });
// Event.hasMany(Promotion, {
//   foreignKey: "id",
// });

// // Relació Commerce > Promotion > Event
// // Commerce.belongsToMany(Event, { through: Promotion })
// // Event.belongsToMany(Commerce, { through: Promotion })

// // Relació User > Inscription > Event
// //User.belongsToMany(Event, { through: 'Inscriptions' })
