const { Thought } = require('../models');

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
  createThought() {
  },


  // update thought
  updateThought({ params, body }, res) {

  }
};

module.exports = thoughtController;
