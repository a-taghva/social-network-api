const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers)
  .post(addUser);

router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
