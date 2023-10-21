const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Note = new Schema(
  {
    title: {
      type: String,
      index: true,
      required: true,
    },
    contents: [
      {
        type: {
          type: String,
          required: true,
        },
        value: {
          type: String,
        },
        data: { type: Buffer },
        contentType: { type: String },
      },
    ],
  },
  {
    collection: "note",
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", Note);
