var express = require('express');
var router = express.Router();

/* GET Subjects listing. */
router.get("/", function(req, res, next) {
    const db = req.app.get("db");
    var output = [];
  
    db.collection("Subject")
      .get()
      .then(snapshot => {
        if (snapshot) {
          snapshot.forEach(doc => {
            output.push({
              id: doc.id,
              name: doc.data().Name
            });
          });
          return res.status(200).json(output);
        } else {
          return res.status(404).json({ message: "Any subjects not found." });
        }
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  });

  router.get("/:id", function(req, res, next) {
    const db = req.app.get("db");
    var output = [];
  
    db.collection("Subject")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == req.params.id) {
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
  
  router.get("/name/:name", function(req, res, next) {
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

  /* DELETE Subjects listing. */

router.delete("/:id", (req, res) => {
    const db = req.app.get("db");
  
    db.collection("Subject")
      .doc(req.params.id)
      .delete()
      .then(() => {
        return res.status(200).json({ message: "Subject deleted." });
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  });

module.exports = router;