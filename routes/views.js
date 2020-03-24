var express = require("express");
var router = express.Router();

/* GET Views listing. */
router.get("/", function(req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Views")
    .get()
    .then(snapshot => {
      if (snapshot) {
        snapshot.forEach(doc => {
          output.push({
            id: doc.id,
            value: doc.data().value
          });
        });
        return res.status(200).json(output);
      } else {
        return res.status(404).json({ message: "Any views not found." });
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
  let not_found;
  var output = [];

  db.collection("Views")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.id == req.params.id) {
          output.push({
            id: doc.id,
            value: doc.data().value
          });
        }
      });
      if (output.length === 0) {
        return res.status(404).json({ message: "Any views not found." });
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

/* POST Views listing. */

router.post("/", (req, res) => {
  const db = req.app.get("db");

  db.collection("Views")
    .add({
      value: 0,
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

/* PUT Views listing. */

router.put("/:id", (req, res) => {
  const db = req.app.get("db");

  let tmp_value = req.body.value;
  var update = {};

  if (tmp_value) update["value"] = tmp_value;

  if (!update) {
    return res.status(304).json({ message: "No changes." });
  } else {
    db.collection("Views")
      .doc(req.params.id)
      .set(update, { merge: true })
      .then(() => {
        return res.status(200).json({ message: "Views updated." });
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  }
});

/* DELETE Views listing. */

router.delete("/:id", (req, res) => {
  const db = req.app.get("db");

  db.collection("Views")
    .doc(req.params.id)
    .delete()
    .then(() => {
      return res.status(200).json({ message: "Views deleted." });
    })
    .catch(error => {
      return res
        .status(400)
        .json({ message: "Unable to connect to Firestore." });
    });
});

module.exports = router;
