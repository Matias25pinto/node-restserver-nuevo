const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password, No es correcto ",
      });
    }
    //Si el usuario esta activo en la BD
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password, No es correcto ",
      });
    }
    //Verificar el password
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password, No es correcto ",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);
    res.json({
      msg: "Login ok",
      usuario,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
