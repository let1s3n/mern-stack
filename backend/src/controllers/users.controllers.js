const usersCtrl = {};
const User = require('../models/User')

usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

usersCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

usersCtrl.createUser = async (req, res) => {
  const {username} = req.body;
  const newUser = new User({
    username
  });
  await newUser.save();
  res.json('User created');
};

usersCtrl.updateUser = async (req, res) => {
  const {username} = req.body;
  await User.findByIdAndUpdate(req.params.id,{
    username
  });
  res.json('User Updated');
};

usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json('User Deleted');
};


module.exports = usersCtrl;