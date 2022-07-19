const {Sequelize,sequelize} = require("../models/db");
const {User,Token, Rol} = require("../models");
const Op = Sequelize.Op;
// Create and Save a new Rol
// Retrieve all Roles from the database.
exports.index = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    console.log("roles",roles)
    res.send(roles);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "No hemos podido listar los roles"
    });
  }
};
exports.store = async (req, res) => {
  try {
    const rol = Rol.build(req.body);
    /* probar en poner MockData.JSON */
    rol.save();
    res.send(rol)
  } catch (error) {
    console.log("error",error)
    res.status(500).send({
      message:
        error.message || "No se ha podido crear el rol, revisa los datos introducidos"
    });
  }
};
// Find a single Rol with an id
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const rol = await Rol.findByPk(id);
    return res.status(200).send(rol);
  } catch (error) {
    res.status(404).send({
      message:
        error.message || "No hemos podido encontrar el rol con el id seleccionado"
    });
  }
};
// Update a Rol by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const rol = await Rol.update(req.body,{
      where : {id : id}
    });
    console.log("rol",rol)
    res.send("El rol se ha actualizado correctamente");
  } catch (error) {
    res.status(404).send({
      message:
        error.message || "No hemos podido encontrar el rol con el id seleccionado"
    });
  }
};
// Delete a Rol with the specified id in the request
exports.destroy = async (req, res) => {
  const mockData = {
    nombre:"prueba2",
    apellidos:"pruebaApellido2",
    password:"prueba2",
  }
  try {
    const id = req.params.id;
    const rol = await Rol.destroy({
      where : {id : id}
    });
    res.send("El rol se ha eliminado correctamente");
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "No hemos podido encontrar el rol con el id seleccionado"
    });
  }
};