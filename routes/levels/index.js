var express = require('express');
var router = express.Router();

/* GET Levels listing. */
router.get("/", function(req, res, next) {
    const db = req.app.get("db");
    var output = [];
    
    db.collection("Level")
      .get()
      .then(snapshot => {
        if (snapshot) {
          snapshot.forEach(doc => {
            console.log(doc)
            output.push({
              id: doc.id,
              value: doc.data().Value
            });
          });
          return res.status(200).json(output);
        } else {
          return res.status(404).json({ message: "Any levels not found." });
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
  
    db.collection("Level")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == req.params.id) {
            output.push({
              id: doc.id,
              value: doc.data().Value
            });
          }
        });
        if (output.length === 0) {
          return res.status(404).json({ message: "Any levels not found." });
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

  /* POST Levels listing. */

router.post("/", (req, res) => {
    const db = req.app.get("db");
    let tmp_value = req.body.value;
  
    db.collection("Level")
      .add({
        Value: tmp_value,
      })
      .then(ref => {
        if (ref.id) {
          return res.status(200).json({ id: ref.id });
        } else {
          return res.status(400).json({ message: "Something went wrong." });
        }
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  });

/* PUT Levels listing. */

router.put("/:id", (req, res) => {
    const db = req.app.get("db");
  
    let tmp_value = req.body.value;
    var update = {};
  
    if (tmp_value) update["Value"] = tmp_value;
  
    if (!update) {
      return res.status(304).json({ message: "No changes." });
    } else {
      db.collection("Level")
        .doc(req.params.id)
        .set(update, { merge: true })
        .then(() => {
          return res.status(200).json({ message: "Levels updated." });
        })
        .catch(error => {
          return res
            .status(400)
            .json({ message: "Unable to connect to Firestore." });
        });
    }
  });

  /* DELETE Levels listing. */

router.delete("/:id", (req, res) => {
    const db = req.app.get("db");
  
    db.collection("Level")
      .doc(req.params.id)
      .delete()
      .then(() => {
        return res.status(200).json({ message: "Level deleted." });
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  });
  
module.exports = router;