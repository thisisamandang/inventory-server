const Inventory = require("../models/InventoryModel");

module.exports.postAddInventory = async (req, res, next) => {
  try {
    const { itemName, category, itemCode, description, unit, stocks, low } =
      req.body;
    // const codeCheck = await inventory.findOne({ itemCode });
    // if (codeCheck)
    //   return res.json({
    //     msg: "Item code that you have entered already exists you can update stock of that item directly.",
    //     status: false,
    //   });
    const inventory = await Inventory.create({
      itemName,
      category,
      itemCode,
      description,
      unit,
      stocks,
      low,
    });
    return res.json({ status: true, inventory });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getInventory = async (req, res, next) => {
  try {
    const { user } = req.body;
    const inventoryItems = await Inventory.find({
      _id: { $ne: req.params.id },
    }).select([
      "itemName",
      "category",
      "itemCode",
      "description",
      "unit",
      "stocks",
      "low",
    ]);
    return res.json(inventoryItems);
  } catch (ex) {
    next(ex);
  }
};
