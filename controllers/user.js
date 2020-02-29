// include product model
const db = require("../lib/databaseFactory");


// create a new user.
exports.create_user = async (req, res) => {
  db.create_user(req, res);
};

// retrieve and return all products.
exports.get_all_users = async (req, res) => {
  db.get_users(req, res);
};

// find a single product with a id.
exports.get_user_by_id = async (req, res) => {
  db.get_user_by_id(req, res);
};

// update a product  by the id.
exports.update_user = async (req, res) => {
  db.update_user(req, res);
};

// delete a product with the specified id.
exports.delete_user_by_id = async (req, res) => {
  db.delete_user_by_id(req, res);
};

exports.login = async (req, res) => {
  db.login(req, res);
};

exports.logout = async (req, res) => {
  db.logout(req, res);
};

exports.get_user_profile = async (req, res) => {
  db.get_user_profile(req, res);
};

exports.logout_all = async (req, res) => {
  db.logout_all
};
