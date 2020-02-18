class Database {
  constructor(host, port, name) {
    this.host = host;
    this.port = port;
    this.name = name;
  }
  connect() {}
  get_user_ById() {}
  createUser() {}
  getUsers() {}
  updateUserById() {}
  deleteUserById() {}
}

module.exports = Database;
