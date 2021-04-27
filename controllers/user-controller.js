const { User, Thought } = require('../models');

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
    Thought.deleteMany({ userId: params.userId})
      .then(() => {
        return User.findOneAndDelete(
          { _id: params.userId }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id!"});
        }

        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });



    
    // User.findOneAndDelete({ _id: params.userId })
    //   .then(dbUserData => {
    //     if (!dbUserData) {
    //       return res.status(404).json(err);
    //     }

        // removeAssociatedThoughts(dbUserData.username);
        // res.json(dbUserData);
      // })
      // .catch(err => {
        // console.log(err);
        // res.status(400).json(err);
      // })
  },


  // add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidator: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  
  // delete a friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  }
};

// function removeAssociatedThoughts(name) {
//   Thought.deleteMany({ username: name })
//     .then(console.log)
//     .catch(console.log);
// }

module.exports = userController;
