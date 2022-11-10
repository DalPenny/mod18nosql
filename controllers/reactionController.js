const { User, Thought, Reaction } = require('../models');

module.exports = {
  getReaction(req, res) {
    Reaction.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  //get reaction by id
  getSingleReaction(req, res) {
    Reaction.findOne(
        { _id: req.params.reactionId }
        )
      .select('-__v')
      .then((reactionData) =>
        !reactionData
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create a new reaction and add id into model users reactions
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reactionData) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId},
            { $addToSet: { reactions: reactionData._id } },
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

 // delete a reaction
   deleteReaction(req, res) {
    Reaction.findOneAndDelete(req.body)
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => res.status(500).json(err));
  },

  // Update a specific reaction and its contents in the body (Unit 28)
  updateReaction(req, res) {
    Reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbReactionData) =>
        !dbReactionData
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(dbReactionData)
      )
      .catch((err) => res.status(500).json(err));
  },

    //when deleting a reaction will delete assocsiated reaction to the reaction (Unit 28)
    deleteReaction(req, res) {
        Reaction.findOneAndDelete({ _id: req.params.reactionId })
          .then((dbReactionData) =>
            !dbReactionData
              ? res.status(404).json({ message: 'No reaction with that ID' })
              : res.json(dbReactionData)
          )
          .then(() => res.json({ message: 'reaction has been deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

};
