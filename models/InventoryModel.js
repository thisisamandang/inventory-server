const mongoose = require("mongoose");
const InventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  user: {
    type: String,
  },
  itemCode: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  unit: {
    type: String,

    // required: true,
  },
  stocks: {
    type: Number,
    required: true,
  },
  low: {
    type: Number,
  },
});
module.exports = mongoose.model("Inventory", InventorySchema);
