"use strict";

const { response } = require("express");
const bcrypt = require("bcryptjs");

const { generarJWT } = require("../helpers/jwt");
const User = require('../models/users');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
  const userDB = await User.findOne({ email });

  const id = userDB._id.toString()
    
    // Verificar Email

    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    //Verificar contraseña


    const validPassword = bcrypt.compareSync(password, userDB.password);

   
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "contraseña No válida",
      });
    }

    //Generar el token

    const token = await generarJWT(id);

    res.json({
      ok: true,
      userDB,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};



const renewToken = async (req, res = response) => {
  const _id = req._id;
  const token = await generarJWT(_id);
  const { id, name, email } = await User.findById({
    _id,
  });

  res.json({
    ok: true,
    id,
    name,
    email,
   
    token,
  });
};

module.exports = {
  login,
  renewToken,
};
