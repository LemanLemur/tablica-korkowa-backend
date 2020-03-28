var express = require("express");
var router = express.Router();
var routerUsers = require('./users');
var routerCity = require('./city');
var routerProvince = require('./province');
var helpers = require('./helpers/output');

/* GET Levels listing. */

/*
!!!!!!!!KOLEJNOŚĆ ZAPYTAŃ DLA CARDS!!!!!!!!!!
/province/city/subjectID/levelID/type/isAbleToDrive/isOnline/isHit

*/

router.use("/province", routerProvince);
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

router.post("/", (req, res) => {
  const db = req.app.get("db");
  let description = req.body.description;
  let startDate = req.body.startDate
  let endDate = req.body.startDate + 2678400; // 31 dni
  let created = new Date.now();
  let isdeleted = null;
  let isHit = req.body.isHit;
  let status = 1; //active
  let userID = req.body.isHit;
  let type = req.body.type;
  let price = req.body.price;
  let isAbleToDrive = req.body.isAbleToDrive
  let range = req.body.range
  let city = req.body.city
  let province = req.body.province
  let viewsID
  let isOnline = req.body.isOnline
  let levelID = req.body.levelID
  let subjectID = req.body.subjectID

  db.collection("Views")
    .add({
      value: 0,
    })
    .then(ref => {
      if (ref.id) {
        viewsID = ref.id
      } else {
        return res.status(400).json({ message: "Something went wrong." });
      }
    })
    .catch(error => {
      return res
        .status(400)
        .json({ message: "Unable to connect to Firestore." });
    });


  db.collection("Users")
    .add({
      Description: description,
      StartDate: startDate,
      EndDate: endDate,
      Created: created,
      Deleted: isdeleted,
      IsHit: isHit,
      Status: status,
      UserID: userID,
      Type: type,
      Price: price,
      IsAbleToDrive: isAbleToDrive,
      Range: range,
      City: city,
      Province: province,
      ViewsID: viewsID,
      IsOnline: isOnline,
      LevelID: levelID,
      SubjectID: subjectID
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

module.exports = router;
