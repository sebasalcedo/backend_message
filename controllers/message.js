const { response } = require("express");

const Message = require("../models/message");

const getMessage = async (req, res = response) => {
  const message = await Message.find().populate("user", "name");

  res.json({
    ok: true,
    message: message,
  });
};

const newMessage = async (req, res = response) => {
  const id = req._id;

  const message = new Message({
    message: id,
    ...req.body,
  });

  try {
    const registerMessage = await Message.save();

    return res.status(400).json({
      ok: false,
      Message: registerMessage,
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      ok: false,
      msg: "Se ha presentado un error al momento de registrar el nuevo mensaje",
    });
  }
};

const updateMessage = async (req, res = response) => {
  const id = req.params.id;
  const user = req._id;

  try {
    const message = await Message.findById(id);

    if (!message) {
      return res.status(500).json({
        ok: false,
        msg: "No se ha logrado encontrar un resultado para la busqueda de actualización",
      });
    }

    const updateMsg = {
      ...req.body,
      user: user,
    };

    const msgUpdate = await Message.findByIdAndUpdate(id, updateMsg, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: "Se ha realizado con exito la actualización",
      message: msgUpdate,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      msg: "Se ha presentado una falla al momento de actualizar el mensaje",
    });
  }
};


const deleteMessage = async ( req, res = response ) => {

    const id = req.params.id;

    try {


        const messageDB = await Message.findById(id);

        if (!messageDB) {
            
            return res.status(404).json({
                ok: false,
                msg: ' no se encontro un registro con esa info para ser eliminado'
            })

        }
                
        const deleteMsg = await Message.findByIdAndDelete( id );

        return res.status(200).json({
            ok: true,
            msg: 'Se ha eliminado correctamente el msg',
            deleteMsg
        })

    } catch (err) {
        console.log(err);

        return res.status(500).json({
          ok: false,
          msg: "SE ha presentado un error al momento de eliminar el mensaje",
        });
    }


}

module.exports = {
  getMessage,
  newMessage,
  deleteMessage,
  updateMessage
}
