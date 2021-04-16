const router = require('express').Router();
const {
  getAllUsers,
  getUserById
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers);

module.exports = router;
