// include product model
const User = require("../models/user");
const DB = require("../lib/databaseFactory");

const db = DB;

// create a new user.
exports.create_user = (req, res) => {
  db.create_user(req, res);
};

// retrieve and return all products.
exports.get_all_users = (req, res) => {
  db.get_users(req, res);
};

// find a single product with a id.
exports.get_user_by_id = (req, res) => {
  db.get_user_by_id(req, res);
};

// update a product  by the id.
exports.update_user = (req, res) => {
  db.update_user(req, res);
};

// delete a product with the specified id.
exports.delete_user_by_id = (req, res) => {
  db.delete_user_by_id(req, res);
};
