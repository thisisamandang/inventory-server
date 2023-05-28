const {
  postAddInventory,
  getInventory,
  postDeleteItem,
  updateItem,
} = require("../controllers/InventoryController");

const router = require("express").Router();
router.post("/additem", postAddInventory);
router.get("/getitem/:userid", getInventory);
router.post("/deleteitem", postDeleteItem);
router.post("/updateitem/:codeid", updateItem);
module.exports = router;
