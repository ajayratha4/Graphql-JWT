const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateToken } = require("../../utils/jwt");

const createUser = async (email, name, password) => {
  const user = new User({
    name,
    email,
    password,
  });

  const res = await user.save();
  const token = generateToken(JSON.stringify(res._id));
  return { token };
};

const getUsers = async () => {
  return await User.find();
};

const getUser = async (userId) => {
  return await User.findOne({ _id: userId });
};

module.exports = { createUser, getUsers, getUser };
