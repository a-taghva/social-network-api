const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  removeThought
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThoughts)

module.exports = router;
