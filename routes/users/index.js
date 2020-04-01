var express = require("express");
var router = express.Router();

/* GET */
router.get("/", function(req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Users")
    .get()
    .then(snapshot => {
      if (snapshot) {
        snapshot.forEach(doc => {
          output.push({
            id: doc.id,
            accountId: doc.data().AccountID,
            avatar: doc.data().Avatar,
            created: doc.data().Created,
            email: doc.data().Email,
            firstName: doc.data().FirstName,
            lastName: doc.data().LastName,
            lastTimeLogged: doc.data().LastTimeLogged,
            telephone: doc.data().Telephone,
            updated: doc.data().Updated
          });
        });
        return res.status(200).json(output);
      } else {
        return res.status(404).json({ message: "Any Users not found." });
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

  db.collection("Users")
    .doc(req.params.id)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
          output.push({
            id: doc.id,
            accountId: doc.data().AccountID,
            avatar: doc.data().Avatar,
            created: doc.data().Created,
            email: doc.data().Email,
            firstName: doc.data().FirstName,
            lastName: doc.data().LastName,
            lastTimeLogged: doc.data().LastTimeLogged,
            telephone: doc.data().Telephone,
            updated: doc.data().Updated
          });
      });
      if (output.length === 0) {
        return res.status(404).json({ message: "Any Users not found." });
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

router.get("/accountid/:id", function(req, res, next) {
  const db = req.app.get("db");
  var output = [];
  console.log(req.params.id);
  db.collection("Users")
    .where('AccountID', '==', req.params.id)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
          output.push({
            id: doc.id,
            accountId: doc.data().AccountID,
            avatar: doc.data().Avatar,
            created: doc.data().Created,
            email: doc.data().Email,
            firstName: doc.data().FirstName,
            lastName: doc.data().LastName,
            lastTimeLogged: doc.data().LastTimeLogged,
            telephone: doc.data().Telephone,
            updated: doc.data().Updated
          });
      });
      if (output.length === 0) {
        return res.status(404).json({ message: "Any Users not found." });
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

/* POST */

router.post("/", (req, res) => {
  const db = req.app.get("db");
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let timestamp = new Date();
  let telephone = req.body.telephone;

  db.collection("Users")
    .add({
      FirstName: firstname,
      LastName: lastname,
      Created: timestamp,
      Telephone: telephone
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

/* PUT */

router.put("/:id", (req, res) => {
  const db = req.app.get("db");
  let timestamp = new Date();
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let telephone = req.body.telephone;
  let avatar = req.body.avatar;
  var update = {};

  update["Updated"] = timestamp;
  if (firstname) update["FirstName"] = firstname;
  if (lastname) update["LastName"] = lastname;
  if (telephone) update["Telephone"] = telephone;
  if (avatar) update["Avatar"] = avatar;

  db.collection("Users")
    .doc(req.params.id)
    .set(update, {merge: true}
    )
    .then(() => {
      return res.status(200).json({ message: "Data updated." });
    })
    .catch(error => {
      return res
        .status(400)
        .json({ message: "Unable to connect to Firestore." });
    });
});

router.put("/lastlogged/:id", (req, res) => {
  const db = req.app.get("db");
  let timestamp = new Date();

  db.collection("Users")
    .doc(req.params.id)
    .set(
      {
        LastTimeLogged: timestamp
      },
      {
        merge: true
      }
    )
    .then(() => {
      return res.status(200).json({ message: "Data updated." });
    })
    .catch(error => {
      return res
        .status(400)
        .json({ message: "Unable to connect to Firestore." });
    });
});

/* PUT */

router.delete("/:id", (req, res) => {
  const db = req.app.get("db");

  db.collection("Users")
    .delete(req.params.id)
    .then(() => {
      return res.status(200).json({ message: "User deleted." });
    })
    .catch(error => {
      return res
        .status(400)
        .json({ message: "Unable to connect to Firestore." });
    });
});

module.exports = router;
