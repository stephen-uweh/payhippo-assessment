const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid").v1;
const Schema = mongoose.Schema;


const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String
    },

    listId: {
      type: Schema.Types.ObjectId,
      ref: "lists",
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Item = mongoose.model("items", itemSchema);
module.exports = Item;
