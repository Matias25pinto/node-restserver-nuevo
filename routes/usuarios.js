const { Router } = require("express");

const { check } = require("express-validator");


const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares/index');

const {
  esRoleValido,
  esEmailValido,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

//Importar los controladores
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

//Peticiones
router.get(
  "/",
  [
    check("desde", "No es un número").isNumeric(),
    check("limite", "No es un número").isNumeric(),
    validarCampos, //sin validarCampos no se detiene el proceso
  ],
  usuariosGet
);
router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
); //:id parametro de entorno
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(esEmailValido),
    //check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
