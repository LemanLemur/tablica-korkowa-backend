var express = require("express");
var router = express.Router();
var routerUsers = require('./users');
var routerCity = require('./city');

var helpers = require('./helpers/output');

/* GET Levels listing. */

router.use("/city", routerCity);

router.use("/userID", routerUsers);

router.get("/", function (req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Card")
    .get()
    .then(snapshot => {
      if (snapshot) {
        snapshot.forEach(doc => {
          output.push(helpers.getOutput(doc));
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

router.get("/:id", function (req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Card")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.id == req.params.id) {
          output.push(helpers.getOutput(doc));
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
module.exports = router;
