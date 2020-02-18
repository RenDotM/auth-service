// include product model
const User = require("../models/user");

const db = DatabaseFactory.createDB(process.env.DB_TYPE || "memory");

// create a new Product.
exports.user_create = function(req, res) {
  // validate request
  if (!req.body.id || !req.body.name) {
    return res.status(400).send({
      success: false,
      message: "Please enter product name and price"
    });
  }

};

// retrieve and return all products.
exports.all_products = (req, res) => {
  Product.find()
    .then(data => {
      var message = "";
      if (data === undefined || data.length == 0) message = "No product found!";
      else message = "Products successfully retrieved";

      res.send({
        success: true,
        message: message,
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};

// find a single product with a id.
exports.product_details = (req, res) => {
  Product.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      res.send({
        success: true,
        message: "Product successfully retrieved",
        data: data
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error retrieving product with id " + req.params.id
      });
    });
};

// update a product  by the id.
exports.product_update = (req, res) => {
  // validate request
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({
      success: false,
      message: "Please enter product name and price"
    });
  }

  // find product and update
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    { new: true }
  )
    .then(data => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      res.send({
        success: true,
        data: data
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating product with id " + req.params.id
      });
    });
};

// delete a product with the specified id.
exports.product_delete = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      res.send({
        success: true,
        message: "Product successfully deleted!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete product with id " + req.params.id
      });
    });
};
