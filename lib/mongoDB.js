const Database = require("./db");
const User = require("../models/user");

class MongoDB extends Database {
  constructor(host, port, name) {
    super(host, port, name);
    this.database_url = `mongodb://${host}/${name}`;
  }

  connection() {
    console.log("Trying to connect mongoDB.");
    const mongoose = require("mongoose");
    this.dbConnection = mongoose
      .connect(this.database_url, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Successfully connected to the mongo database");
      })
      .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });

    return this.dbConnection.connection;
  }

  async create_user(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Please enter User id, username, and password."
      });
    }
    // create a User
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      tenants: req.body.tenants
    });

    // save User in the database.
    user
      .save()
      .then(data => {
        data.generateAuthToken().then(token => {
          res.send({
            success: true,
            message: "User successfully created",
            data: user,
            token: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while creating the user."
        });
      });
  }

  async get_users(req, res) {
    User.find()
      .then(data => {
        let message = "";
        if (data === undefined || data.length === 0) message = "No User found!";
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

  async get_user_by_id(req, res) {
    User.findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "User not found with user id " + req.params.id
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
            message: "User not found with user id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error retrieving User with user id " + req.params.id
        });
      });
  }

  async update_user(req, res) {
    // validate request
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Please enter user username and password"
      });
    }

    // find User and update
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      },
      { new: true }
    )
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "User not found with user id " + req.params.id
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
            message: "User not found with user id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error updating User with user id " + req.params.id
        });
      });
  }

  async delete_user_by_id(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "User not found with user id " + req.params.id
          });
        }
        res.send({
          success: true,
          message: "User successfully deleted!"
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.username === "NotFound") {
          return res.status(404).send({
            success: false,
            message: "User not found with user id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Could not delete User with user id " + req.params.id
        });
      });
  }

  async login(req, res) {
    try {

      if (!req.body.username || !req.body.password) {
        return res.status(400).send({
          success: false,
          message: "Please enter, username, and password."
        });
      }
      const username = req.body.username;
      const password = req.body.password;
      const user = await User.findByCredentials(username, password);
      return res.status(401).send("error")
      if (!user) {
        return res
          .status(401)
          .send({ error: "Login failed! Check authentication credentials" });
      } else {
        console.log(user);
      }
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = MongoDB;
