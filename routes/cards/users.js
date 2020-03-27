var express = require("express");
var router = express.Router();
/*
----
/cards/province/:province/city/:city/isAbleToDrive/:isAbleToDrive/isHit/:isHit/isOnline/:isOnline/status/:status/type/:type
----

UserID                                        /cards/UserID/wisBxHFFr8dztgSpLBao
UserID && Status                              /cards/UserID/wisBxHFFr8dztgSpLBao/type/0  => 0-szkic, 1-aktywne, 2-nieaktywne, 3-zakończone


            



*/
router.get("/:userID", function (req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Card")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().UserID == req.params.userID) {
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
            levelId: doc.data().LevelId,
            price: doc.data().Price,
            range: doc.data().Range,
            startDate: doc.data().StartDate,
            status: doc.data().Status,
            subjectID: doc.data().SubjectID,
            tittle: doc.data().Tittle,
            type: doc.data().Type,
            userId: doc.data().UserId,
            viewsId: doc.data().ViewsId,
            province: doc.data().Province,
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

router.get("/:userID/status/:status", function (req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Card")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().UserID == req.params.userID) {
          if (doc.data().Status == req.params.status) {
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
              levelId: doc.data().LevelId,
              price: doc.data().Price,
              range: doc.data().Range,
              startDate: doc.data().StartDate,
              status: doc.data().Status,
              subjectID: doc.data().SubjectID,
              tittle: doc.data().Tittle,
              type: doc.data().Type,
              userId: doc.data().UserId,
              viewsId: doc.data().ViewsId,
              province: doc.data().Province,
            });
          }
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