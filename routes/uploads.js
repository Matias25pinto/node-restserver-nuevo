const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const validarArchivos = require("../middlewares/validar-archivos");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
} = require("../controllers/uploads");

const router = Router();

router.post("/", [validarArchivos], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuario", "productos"])
    ),
    validarCampos,
    validarArchivos,
  ],
  actualizarImagen
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuario", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
