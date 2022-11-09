const { User, Thought } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //get thought by id
  getSingleThought(req, res) {
    Thought.findOne(
        { _id: req.params.thoughtId }
        )
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId},
            { $addToSet: { thoughts: thoughtData._id } },
            { new: true }
        );
      })
      .then((User) => {
        if (!User) {
            res.status(404).json({ message: "User ID not found!"});
            return;
        }
        res.json(User);
      })

      .catch((err) => res.status(500).json(err));
  },

   //update a thought
   updateThought(req, res) {
    Thought.findOneAndUpdate(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

 // delete a thought
   deleteThought(req, res) {
    Thought.findOneAndDelete(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
};
