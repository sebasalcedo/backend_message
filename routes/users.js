const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getUsers,
  registerNewUser,
  updateUser,
} = require("../controllers/users");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [validarJWT], getUsers);

router.post(
  "/",
  [
    check("name", " El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  registerNewUser
);

router.put(
  "/:id",
  [
    validarJWT,
    check("name", " El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),

    validarCampos,
  ],
  updateUser
);

module.exports = router;
