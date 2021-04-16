const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // create thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        updateUser(dbThoughtData.username, dbThoughtData._id);
        res.json(dbThoughtData);
      });
  },


  // update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate( { _id: params.thoughtId }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // create reaction
  createReaction({ body, params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidator: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json(err);
        }

        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },


  // delete reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json(err);
        }

        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

function updateUser(username, reactionId) {
  User.findOneAndUpdate(
    { username: username },
    { $push: { thoughts: reactionId } }
  )
    .then(d => {
      console.log('updateUser', d);
    })
    .catch(err => conosle.log(err));
}

module.exports = thoughtController;
