const { User, Thought } = require('../models');

module.exports = {
    getAllUser(req, res) {
        User.find()
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

    //when deleting a user will delete associated thoughts, (Unit 28)
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((dbUserData) =>
            !dbUserData
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: dbUserData.userId } })
          )
          .then(() => res.json({ message: 'User and thoughts associated to it have been deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
};
