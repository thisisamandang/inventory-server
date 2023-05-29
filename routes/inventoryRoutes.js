const {
  postAddInventory,
  getInventory,
  postDeleteItem,
  updateItem,
  getLowStock,
} = require("../controllers/InventoryController");

const router = require("express").Router();
router.post("/additem", postAddInventory);
router.get("/getitem/:userid", getInventory);
router.get("/getLowStock/:userid", getLowStock);
router.post("/deleteitem", postDeleteItem);
router.put("/updateitem/:updationCode", updateItem);
module.exports = router;
