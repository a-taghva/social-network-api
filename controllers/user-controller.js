const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    console.log(req);
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  // get a single user by id
  getUserById({ params }, res) {
    User.finOne({ _id: params.user_id })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }

        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

module.exports = userController;
