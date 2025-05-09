const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  itemName: {type: String, require: true},
  description: {type: String, require: true},
  locationFound:{type: String, require: true},
  dateFound:{type: Date, default: 0},
  claimed: {type: Boolean, default: true}
}, {timestamps: true })


  

const Item = new mongoose.model("item", itemSchema)

module.exports = Item