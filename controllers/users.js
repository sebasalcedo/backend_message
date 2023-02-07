const { response } = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [users, total] = await Promise.all([
    User.find({}, "name email ").skip(desde).limit(5),

    User.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    total,
  });
};

const registerNewUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese email registrado",
      });
    }

    const user = new User(req.body);

    const pass = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, pass);

    await user.save();

    const token = await generarJWT(user._id);

    res.json({
      ok: true,
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(
      "Se ha presentado un error al resgistrar el nuevo usuario ",
      error
    );

    res.status(500).json({
      ok: false,
      msg: "Se ha presentado un error al registrar al nuevo usuario",
    });
  }
};
const updateUser = async (req, res = response) => {
  try {
    const _id = req.params.id;
    const userDB = await User.findById({ _id });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado algún resultado con la busqueda",
      });
    }

    const { password, email, ...campos } = req.body;

    if (userDB.email !== email) {
      const existEmail = await Usuario.findOne({ email });

      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(_id, campos);

    return res.status(200).json({
      ok: true,
      msg: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
module.exports = {
  getUsers,
  registerNewUser,
  updateUser,
};
