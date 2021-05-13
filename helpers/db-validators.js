const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const exiteRol = await Role.findOne({ rol });
  if (!exiteRol) {
    //Lanzar un error personalizado
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const esEmailValido = async (correo = "") => {
  //Verificar si el correo existe
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  //Verificar si existe usuario
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};


module.exports = {
  esRoleValido,
  esEmailValido,
  existeUsuarioPorId,
};
