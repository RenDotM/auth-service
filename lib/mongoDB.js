const Database = require("./db");
const User = require("../models/user");

class MongoDB extends Database {
  constructor(host, port, name) {
    super(host, port, name);
    this.database_url = `mongodb://${host}:${port}/${name}`;
  }
  connection() {
    const mongoose = require("mongoose");
    this.dbConnection = mongoose
      .connect(this.database_url, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });

    return this.dbConnection.connection;
  }

  create_user(req, res) {
    if (!req.body.id || !req.body.name) {
      return res.status(400).send({
        success: false,
        message: "Please enter User name and price"
      });
    }

    // create a User
    let User = new User({
      name: req.body.name,
      price: req.body.price
    });

    // save User in the database.
    User.save()
      .then(data => {
        res.send({
          success: true,
          message: "User successfully created",
          data: data
        });
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while creating the user."
        });
      });
  }

  get_users(req, res) {
    User.find()
        .then(data => {
          var message = "";
          if (data === undefined || data.length == 0) message = "No User found!";
          else message = "Users successfully retrieved";

          res.send({
            success: true,
            message: message,
            data: data
          });
        })
        .catch(err => {
          res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving Users."
          });
        });
  }

  get_user_by_id(req, res) {
    User.findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "User not found with id " + req.params.id
          });
        }
        res.send({
          success: true,
          message: "User successfully retrieved",
          data: data
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "User not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error retrieving User with id " + req.params.id
        });
      });
  }

  update_user(req, res) {
    // validate request
    if (!req.body.name || !req.body.price) {
      return res.status(400).send({
        success: false,
        message: "Please enter User name and price"
      });
    }

    // find User and update
    User.findByIdAndUpdate(
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
            message: "User not found with id " + req.params.id
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
            message: "User not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error updating User with id " + req.params.id
        });
      });
  }

  delete_user_by_id(req, res) {
    User.findByIdAndRemove(req.params.id)
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
  }
}

module.exports = MongoDB;
