const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers)
  .post(addUser)

router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser);

module.exports = router;
