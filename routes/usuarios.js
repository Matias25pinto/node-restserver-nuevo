const { Router } = require("express");

const router = Router();

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);
//:id parametro de entorno
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.delete("/", usuariosDelete);

module.exports = router;
