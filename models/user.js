const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tenants: [{ type: mongoose.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("User", UserSchema);
