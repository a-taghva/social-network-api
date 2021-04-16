const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  // get a single user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
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
  },


  // add a user
  addUser({ body }, res) {
  User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },


  // update a user
  updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidator: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
        }
        
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  // delete a user by it's id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json(err);
        }

        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.staus(400).json(err);
      })
  }
};

module.exports = userController;
