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

    if (!itemCode) {
      return res.json({
        msg: "Item Code needs to be filled.",
        status: false,
      });
    }
    if (!stocks) {
      return res.json({
        msg: "Stocks Field Need to be filled.",
        status: false,
      });
    }
    if (!itemName) {
      return res.json({
        msg: "Please Provide an Item Name",
        status: false,
      });
    }

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
    const codeid = req.params.updationCode;
    console.log("Code ID:", codeid);
    const { UpdateditemName, UpdatedCategory, UpdatedDescription, stocks } =
      req.body;
    console.log("Updated Item Name:", UpdateditemName);
    console.log("Updated Category:", UpdatedCategory);
    console.log("Updated Description:", UpdatedDescription);
    Inventory.findOneAndUpdate(
      { itemCode: codeid },
      {
        itemName: UpdateditemName,
        category: UpdatedCategory,
        description: UpdatedDescription,
        stocks: stocks,
      },
      { new: true }
    )
      .then((updatedInventory) => {
        if (!updatedInventory) {
          console.log("No matching document found");
          return res.json({
            status: false,
            error: "No matching document found",
          });
        }
        console.log("Updated Inventory:", updatedInventory);
        return res.json({ status: true, inventory: updatedInventory });
      })
      .catch((error) => {
        console.log("Error updating document:", error);
        return res
          .status(500)
          .json({ error: "An error occurred during update" });
      });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getLowStock = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const inventoryItems = await Inventory.find({
      user: userid,
    })
      .$where("this.stocks < this.low")
      .select([
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
