/*  
    path: '/api/messages/'
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  getMessage,
  newMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/message");
const { validarJWT } = require("../middlewares/validar-jwt");



const router = Router();



router.get("/", [ validarJWT ], getMessage);
  
  router.post("/", [
   validarJWT,
    check('message', 'El mensaje es  obligatorio!!!').not().isEmpty(),
    validarCampos
  
  ], newMessage);
  
  router.put("/:id", 
    [
    validarJWT,
    check('message', 'El mensaje es  obligatorio!!!').not().isEmpty(),
    validarCampos
    ], 
    updateMessage);
  
  router.delete("/:id", [validarJWT], deleteMessage);
  
  module.exports = router;
  