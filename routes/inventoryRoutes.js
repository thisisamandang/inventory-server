const {
  postAddInventory,
  getInventory,
} = require("../controllers/InventoryController");

const router = require("express").Router();
router.post("/additem", postAddInventory);
router.get("/getitem", getInventory);
module.exports = router;
