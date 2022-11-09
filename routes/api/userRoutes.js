const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
//   addThought,
//   removeThought,
} = require('../../controllers/userController');

// /api/User
router.route('/').get(getUser).post(createUser);

// /api/User/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// // /api/User/:userId/thoughts
// router.route('/:userId/thoughts').post(addThought);

// // /api/User/:userId/thoughts/:thoughtId
// router.route('/:studentId/thought/:thoughtId').delete(removeThought);

module.exports = router;
