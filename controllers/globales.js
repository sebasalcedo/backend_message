"use strict";
const { response } = require("express");

const User = require('../models/users');
const Message = require('../models/message');

const getBusquedaData = async (req, res = response) => {
  const dtBusqueda = req.params.busqueda;
  const regex = new RegExp(dtBusqueda, "i");

  const [user, message] = await Promise.all([
    User.find({
      name: regex,
    }),
    Message.find({
      message: regex,
    }),

  ]);

  return res.status(200).json({
    ok: false,
    user,
    message,
   
  });
};

const getDataGlobal = async (req, res = response) => {
  const dtTabla = req.params.tabla;
  const dtBusqueda = req.params.busqueda;
  let data = [];

  const regex = new RegExp(dtBusqueda, "i");

  switch (dtTabla) {
    case "user":
      data = await User.find({
        name: regex,
      })
        .populate("name", "name")
      
      break;
    case "message":
      data = await Message.find({
        nombre: regex,
      }).populate("name", "name");

      break;
   
    default:
      return res.status(400).json({
        ok: false,
        msg: " La tabla tiene que ser user - message",
      });
  }

  res.json({
    ok: true,
    resultado: data,
  });
};



module.exports = {
  getBusquedaData,
  getDataGlobal,
 
};
