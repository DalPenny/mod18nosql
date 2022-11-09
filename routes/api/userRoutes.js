const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// // /api/user/:userId/thoughts
// router.route('/:userId/thoughts').post(addThought);

// // /api/user/:userId/thoughts/:thoughtId
// router.route('/:studentId/thought/:thoughtId').delete(removeThought);

module.exports = router;
