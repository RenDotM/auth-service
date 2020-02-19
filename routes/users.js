const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");

/* GET users listing. */
router.post("/", user_controller.create_user);
router.get("/", user_controller.get_all_users);
router.get("/:id", user_controller.get_user_by_id);
router.put("/:id", user_controller.update_user);
router.delete("/:id", user_controller.delete_user_by_id);

module.exports = router;
