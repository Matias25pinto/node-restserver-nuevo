const { Router } = require("express");
const { check } = require("express-validator");

const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validarCampos, validarJWT } = require("../middlewares/index");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const router = Router();

//obtenerProductos
router.get("/", obtenerProductos);
//obtenerProducto válidar: id, que existe id
router.get(
  "/:id",
  [check("id").custom(existeProducto), validarCampos],
  obtenerProducto
);

//crearProducto validar: nombre, usuario(jwt), categoría(existe),
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria", "La categoría es obligatorio").notEmpty(),
    check("categoria", "No es un id válido").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  crearProducto
);

//actualizarProducto
router.put(
  "/:id",
  [
    validarJWT,
    check("id").custom(existeProducto),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("precio", "El precio es obligatorio").notEmpty(),
    check("categoria", "La categoría es obligatoria").notEmpty(),
    check("categoria").custom(existeCategoria),
    check("descripcion", "La descripción es obligatoria").notEmpty(),
    check(
      "disponible",
      "Es obligatorio indicar si el producto esta disponible"
    ).notEmpty(),
    validarCampos,
  ],
  actualizarProducto
);

//borrarProducto
router.delete(
  "/:id",
  [validarJWT, check("id").custom(existeProducto), validarCampos],
  borrarProducto
);

module.exports = router;
