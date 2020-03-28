var express = require("express");
var router = express.Router();

router.get("/:name", function(req, res, next) {
    const db = req.app.get("db");
    var output = [];
  
    db.collection("Subject")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().Name == req.params.name) {
            output.push({
              id: doc.id,
              name: doc.data().Name
            });
          }
        });
        if (output.length === 0) {
          return res.status(404).json({ message: "Any subjects not found." });
        } else {
          return res.status(200).json(output);
        }
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  });

  module.exports = router;
