var express = require("express");
var router = express.Router();
var importantOutput = require("./helpers/getImportantOutput");
var getMyCards = require("./helpers/getMyCards");
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
  var count = 0;
  var last = 0;
  var iteration = 0;
  return new Promise(function (resolve, reject) {
    db.collection("Card")
      .where('UserID', '==', req.params.userID)
      //.where('Status', '==', parseInt(2))    my chcemy wszystkie jakie ma, więc zakomentowane
      .get()
      .then(snapshot => {
        snapshot.forEach(x => {
          count++  
        })
        snapshot.forEach(document => {
          //return new Promise(function (resolve2, reject) {
            //db.collection("Subject")
              //.doc(document.data().SubjectID)
              //.get()
              //.then(snapshot2 => {
                //console.log(snapshot2.data().Name)
                //resolve2(snapshot2.data().Name)
             // })

          //}).then(SubjectName => {
            
              db.collection("Users")
              .where('AccountID', '==', document.data().UserID)
                .get()
                .then(snapshot3 => { 
                  snapshot3.forEach(document3 => {
                    return new Promise(function (resolve3, reject) {
                    //console.log(document3.data().Avatar)
                    resolve3(document3.data().Avatar)
                  }).then( (avatar) => {
                    db.collection("Level")
                    .doc(document.data().LevelID)
                      .get()
                      .then(snapshot4 => { 
                          return new Promise(function (resolve4, reject) {
                          resolve4(snapshot4.data().Value)
                          }).then((level) => {
                            //output.push(importantOutput.getImportantOutput(document, SubjectName, avatar, level));
                            
                            iteration++
                            output.push(getMyCards.getMyCards(document, avatar, level));
                            if(count == iteration){
                              resolve(output)
                            }
                            
                          })
                        })
                  })
                })
            })
          //})
        })
      })
    }).then(x => {
        if (x.length === 0) {
          return res.status(404).json({ message: "Any levels not found." });
        } else {
          return res.status(200).json(x);
        }
      
      
    })
  })

router.get("/:userID/status/:status", function (req, res, next) {
  const db = req.app.get("db");
  var output = [];

  db.collection("Card")
  .where('UserID', '==', req.params.userID)
  .where('Status', '==', parseInt(req.params.status))
    .get()
    .then(snapshot => {
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