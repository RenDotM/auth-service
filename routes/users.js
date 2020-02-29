const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");
const auth = require("../middleware/auth");

/* GET users listing. */
router.post("/", user_controller.create_user);
router.get("/", user_controller.get_all_users);
// router.get("/:id", user_controller.get_user_by_id);
router.put("/:id", user_controller.update_user);
router.delete("/:id", user_controller.delete_user_by_id);
router.post("/login", user_controller.login);
router.get("/me", auth, user_controller.get_user_profile);
router.post("/me/logout", auth, user_controller.logout);
router.post("/me/logoutall", auth, user_controller.logout_all);

module.exports = router;

