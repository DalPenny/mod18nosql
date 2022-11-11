const { User, Thought, Reaction } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //get thought by id
  getSingleThought(req, res) {
    Thought.findOne( { _id: req.params.thoughtId })
      .populate({path: 'reactions',  select: '-__v' })
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
            { _id: req.body.userID},
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

  // Update a specific Thought and its contents in the body (Unit 28)
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

    //when deleting a thought will delete assocsiated reaction to the thought (Unit 28)
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'No thought with that ID' })
              // pull the thought id from user thoughts column
              : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
          )
          .then(() => res.json({ message: 'Thought and reactions associated to it have been deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

// Add a thought reaction
addThoughtReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    //only allows same id once (Unit 26)
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

// Remove thought reaction
removeThoughtReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

};
