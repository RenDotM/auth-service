const MemoryDatabase = require("./memoryDB");
const MongoDB = require("./mongoDB");

class DatabaseFactory {
  constructor() {}
  static createDB(type) {
    const dbHost = process.env.DB_HOST || "localhost";
    const dbPort = process.env.DB_PORT || "27017";
    const dbName = process.env.DB_NAME || "testdb";
    if (type === "memory") {
      return new MemoryDatabase(dbHost, dbPort, dbName);
    } else if (type === "mongoose") {
      return new MongoDB(dbHost, dbPort, dbName);
    }
  }
}

class Database {
  constructor(host, port, name) {
    this.host = host;
    this.port = port;
    this.name = name;
  }
  connect() {}
  getUserById() {}
  createUser() {}
  getUsers() {}
  updateUserById() {}
  deleteUserById() {}
}

module.exports = DatabaseFactory.createDB(process.env.DB_HOST || "memory");
