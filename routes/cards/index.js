var express = require("express");
var router = express.Router();
var routerUsers = require('./users');
var routerCity = require('./city');

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
          output.push({
            id: doc.id,
            city: doc.data().City,
            created: doc.data().Created,
            deleted: doc.data().Deleted,
            description: doc.data().Description,
            endDate: doc.data().EndDate,
            isAbleToDrive: doc.data().IsAbleToDrive,
            isHit: doc.data().IsHit,
            isOnline: doc.data().IsOnline,
            levelId: doc.data().LevelID,
            price: doc.data().Price,
            range: doc.data().Range,
            startDate: doc.data().StartDate,
            status: doc.data().Status,
            subjectID: doc.data().SubjectID,
            tittle: doc.data().Tittle,
            type: doc.data().Type,
            userId: doc.data().UserID,
            viewsId: doc.data().ViewsID,
            province: doc.data().Province
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

router.get("/:id", function (req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Card")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.id == req.params.id) {
          output.push({
            id: doc.id,
            city: doc.data().City,
            created: doc.data().Created,
            deleted: doc.data().Deleted,
            description: doc.data().Description,
            endDate: doc.data().EndDate,
            isAbleToDrive: doc.data().IsAbleToDrive,
            isHit: doc.data().IsHit,
            isOnline: doc.data().IsOnline,
            levelId: doc.data().LevelID,
            price: doc.data().Price,
            range: doc.data().Range,
            startDate: doc.data().StartDate,
            status: doc.data().Status,
            subjectID: doc.data().SubjectID,
            tittle: doc.data().Tittle,
            type: doc.data().Type,
            userId: doc.data().UserID,
            viewsId: doc.data().ViewsID,
            province: doc.data().Province
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
module.exports = router;
