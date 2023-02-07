"use strict";

/*  
    path: '/api/todo/:busqueda'
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getBusquedaData, getDataGlobal} = require('../controllers/globales');

const router = Router();

router.get("/:busqueda", [ validarJWT ], getBusquedaData);
router.get("/:tabla/:busqueda", [ validarJWT ], getDataGlobal);


module.exports = router;


