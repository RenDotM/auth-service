var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/user");

/* GET users listing. */
router.get("/", user_controller.user_products);
router.post("/create", user_controller.user_create);
router.get("/:id", user_controller.user_details);
router.put("/update/:id", user_controller.user_update);
router.delete("/delete/:id", user_controller.user_delete);

module.exports = router;
