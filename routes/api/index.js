const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const dropCollection = require('./drop-route');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/dropCollection', dropCollection);

module.exports = router;
