const User = require('../models/User');

module.exports = {
  getUser(req, res) {
    User.find()
    .populate({path:"friends", select:"__v -thought"})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //get user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

   // update a user
   updateUser(req, res) {
    User.findOneAndUpdate(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

   // delete a user
   deleteUser(req, res) {
    User.findOneAndDelete(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};
