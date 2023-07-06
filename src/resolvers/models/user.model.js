const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

UserSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
