const router = require('express').Router();

router
  .route("/")
  .delete(function(req, res) {
  connection.dropCollection("social-network", function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
