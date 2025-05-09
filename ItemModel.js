
//  Create an Item model

const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({

    itemName:{type: String, require: true},

    description: {type: String, default: ""},

    locationFound: {type: String, require: true},

    dateFound: {type: Date, require: true},

    claimed: {type: Boolean, default: false}
    
}, {timestamps: true})

const Item = new mongoose.model("Item", itemSchema )

module.exports = Item
