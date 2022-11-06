const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid").v1;
const Schema = mongoose.Schema;


const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    }
  },
  { timestamps: true }
);

const List = mongoose.model("lists", listSchema);
module.exports = List;
