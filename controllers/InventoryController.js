const Inventory = require("../models/InventoryModel");

module.exports.postAddInventory = async (req, res, next) => {
  try {
    const {
      itemName,
      category,
      user,
      itemCode,
      description,
      unit,
      stocks,
      low,
    } = req.body;
    const codeCheck = await Inventory.findOne({ itemCode });
    if (codeCheck)
      return res.json({
        msg: "Item code needs to be unique.",
        status: false,
      });
    const inventory = await Inventory.create({
      itemName,
      category,
      user,
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
    const { userid } = req.params;
    const inventoryItems = await Inventory.find({
      user: userid,
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

module.exports.postDeleteItem = (req, res, next) => {
  try {
    const codeID = req.body.code;
    console.log(codeID);
    Inventory.findOneAndRemove(codeID).then(() => {
      console.log("Deleted");
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateItem = (req, res, next) => {
  try {
    const codeid = req.body.updationCode;
    // const { itemName, category, user, description} =
    //   req.body;
    const UpdateditemName = req.body.productId;
    const UpdatedCategory = req.body.category;
    const UpdatedDescription = req.body.description;

    console.log(codeid);
    Inventory.findById(codeid)
      .then((inventory) => {
        inventory.itemName = UpdateditemName;
        inventory.category = UpdatedCategory;
        inventory.description = UpdatedDescription;
        return inventory.save();
      })
      .then((result) => {
        console.log("Updated Inventory");
      });
    // return res.json({ status: true, Inventory });
  } catch (ex) {
    next(ex);
  }
};
