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
  itemCode: {
    type: Number,
    // unique: true,
  },
  description: {
    type: String,
  },
  unit: {
    type: String,
    // required: true,
  },
  stocks: {
    type: Number,
  },
  low: {
    type: Number,
  },
});
module.exports = mongoose.model("Inventory", InventorySchema);
