const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  //Validar campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next(); //Si todo sale bien pasa al siguiente middleware, o al controlador
};

module.exports = { validarCampos };
