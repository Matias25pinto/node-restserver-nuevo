const { response } = require("express");

const usuariosGet = (req, res = response) => {
  //enviar un html con send
  //res.send("Hello from Class");
  res.json({
    ok: true,
    msg: "get API-Controlador",
  });
};

const usuariosPost = (req, res = response) => {
  const { name, age } = req.body;
  res.json({
    ok: true,
    msg: "post API-Controlador",
    name,
    age,
  });
};

const usuariosPut = (req, res = response) => {
  //parametro de entorno
  const { id } = req.params;
  //querys params
  const {
    saludo,
    nombre = "no hay nombre",
    edad,
    pages = 1,
    limit = 1,
  } = req.query;
  res.json({
    ok: true,
    msg: "put API-Controlador",
    id,
    saludo,
    nombre,
    edad,
    pages,
    limit,
  });
};

const usuariosDelete = (req, res = response) => {
  //enviar un html con send
  //res.send("Hello from Class");
  res.json({
    ok: true,
    msg: "delete API-Controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
