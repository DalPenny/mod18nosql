const router = require('express').Router();
const {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends
router.route('/:userId/friend/').put(addFriend);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friend/:friendId').put(removeFriend);

module.exports = router;
