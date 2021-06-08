const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({ results: usuario ? [usuario] : [] });
  }
  const regex = new RegExp(termino, "i"); //Crear una  expresión regular en Javascript
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({ results: usuarios });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({ results: categoria ? [categoria] : [] });
  }

  const regex = new RegExp(termino, "i"); //Crear  una expresión regular en Javascirpt
  const categorias = await Categoria.find({ nombre: regex, estado: true });
  res.json({ results: categorias });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const producto = await Producto.findById(termino);
    return res.json({ results: producto ? [producto] : [] });
  }

  const regex = new RegExp(termino, "i"); //Crear una expresión regular en Javascript
  const productos = await Producto.find({ nombre: regex, estado: true });
  res.json({ results: productos });
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    default:
      res.status(500).json({ msg: "Se le olvido hacer esta búsqueda" });
  }
};

module.exports = { buscar };
