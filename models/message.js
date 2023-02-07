const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
  message: {
    type: String,
    required: true,
  },

  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateMessage: {
    required: true,
    type: Date
  }
}, { collection: 'message' });


MessageSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
  });
  
  module.exports = model("Message", MessageSchema);
  