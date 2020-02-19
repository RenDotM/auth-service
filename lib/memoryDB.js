"use strict";

const Database = require("./db");

class MemoryDatabase extends Database {
  constructor(host, port, name) {
    super(host, port, name);
    this.users = [
      {
        user_id: "1",
        username: "ck43789@gmail.com",
        password: "abc123",
        tenants: [1, 2, 3]
      },
      {
        user_id: "2",
        username: "ppui2567@gmail.com",
        password: "abc456",
        tenants: [1, 2, 3]
      }
    ];
  }
  connection() {
    console.log("Connected with the memory database.");
    return this.users;
  }

  create_user(req, res) {
    const user = req.body;
    this.users.push(user);
    res.send(this.users);
  }

  get_users(req, res) {
    console.log("Returning users list");

    res.send(this.users);
  }

  get_user_by_id(req, res) {
    const userId = req.params.id;
    const user = this.users.find(_user => _user.user_id === userId);

    console.log("Adding new item: ", user);

    if (user) {
      res.json(user);
    } else {
      res.json({ message: `user ${userId} doesn't exist` });
    }
  }

  update_user(req, res) {
    const userId = req.params.id;
    const content = req.body;
    const updatedListItems = [];
    // loop through list to find and replace one item
    this.users.forEach(oldItem => {
      if (oldItem.user_id === userId) {
        updatedListItems.push(content);
      } else {
        updatedListItems.push(oldItem);
      }
    });

    // replace old list with new one
    this.users = updatedListItems;
    res.send(this.users);
  }

  delete_user_by_id(req, res) {
    // filter list copy, by excluding item to delete
    const userId = req.params.id;
    const filtered_list = this.users.filter(user => user.user_id !== userId);
    this.users = filtered_list;
    res.send(this.users);
  }
}

module.exports = MemoryDatabase;
