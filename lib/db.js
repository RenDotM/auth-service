class Database {
  constructor(host, port, name) {
    this.host = host;
    this.port = port;
    this.name = name;
  }
  connection() {}
  create_user() {}
  get_users() {}
  get_user_by_id() {}
  update_user() {}
  delete_user_by_id() {}
  login() {}
}

module.exports = Database;
