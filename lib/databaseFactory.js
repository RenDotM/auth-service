require("dotenv").config();

const MemoryDatabase = require("./memoryDB");
const MongoDB = require("./mongoDB");

class DatabaseFactory {
  constructor() {}
  static createDB(type) {
    const dbHost = process.env.DB_HOST || "localhost";
    const dbPort = process.env.DB_PORT || "27017";
    const dbName = process.env.DB_NAME || "testdb";
    if (type === "memory") {
      console.log(`The memory databse is created in ${dbHost}:${dbPort}.`);
      return new MemoryDatabase(dbHost, dbPort, dbName);
    } else if (type === "mongoose") {
      console.log(`The MongoDB databse is initiated in ${dbHost}:${dbPort}.`);
      return new MongoDB(dbHost, dbPort, dbName);
    }
  }
}

module.exports = DatabaseFactory.createDB(process.env.DB_TYPE || "memory");
