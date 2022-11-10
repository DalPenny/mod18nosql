const router = require('express').Router();
const {
  getReaction,
  getSingleReaction,
  createReaction,
  updateReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

// /api/reaction
router.route('/').get(getReaction).post(createReaction);

// /api/reaction/:reactionId
router.route('/:reactionId').get(getSingleReaction).put(updateReaction).delete(deleteReaction);

module.exports = router;
