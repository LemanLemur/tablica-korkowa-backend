var express = require("express");
var router = express.Router();
var routerUsers = require('./users');
var routerCity = require('./city');
var routerProvince = require('./province');
var helpers = require('./helpers/output');
var moment = require('moment');
/* GET Levels listing. */

/*
!!!!!!!!KOLEJNOŚĆ ZAPYTAŃ DLA CARDS!!!!!!!!!!
/province/city/subjectID/levelID/type/status/isAbleToDrive/isOnline/isHit

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


/*
POSTMAN -> 
POST localhost:3001/cards/ -> Body -> raw -> JSON
{
	"description": "jakis opis",
	"startDate" : 1585583403,
	"isHit": true,
	"userID": "wisBxHFFr8dztgSpLBao",
	"type": 0,
	"price": 20,
	"isAbleToDrive": true,
	"range": 5,
	"city": "Toruń",
	"province": "Kujawsko-pomorskie",
	"isOnline": true,
	"levelID": "skh0Rn1rvXI5rAeF8sjJ",
	"subjectID": "5e04d570-6dfd-11ea-a51a-e92f5d354da7"
}

*/

router.post("/", (req, res) => {
  const m = moment(new Date(req.body.startDate)).startOf('day').utcOffset("+05:30").format("DD/MM/YYYY HH/mm/ss")
  const db = req.app.get("db");
  let description = req.body.description;
  let startDate = req.body.startDate
  let endDate = req.body.startDate + 2592000 // 30dni
  //let created = moment().format("DD/MM/YYYY HH/mm/ss") ;
  let created = moment().unix();
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
  let isOnline = req.body.isOnline
  let levelID = req.body.levelID
  let subjectID = req.body.subjectID
  return new Promise(function (resolve, reject) {
    db.collection("Views")
      .add({
        value: 0,
      })
      .then(ref => {
        if (ref.id) {
          resolve(ref.id)
        } else {
          return res.status(400).json({ message: "Something went wrong." });
        }
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });

  }).then(viewsIDFromPromise => {
    console.log(viewsIDFromPromise)
    db.collection("Card")
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
        ViewsID: viewsIDFromPromise,
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

  })

});
/*
      DELETE


*/

/*
router.delete("/:id", (req, res) => {
  const db = req.app.get("db");

  db.collection("Views")
    .doc(req.params.id)
    .delete()
    .then(() => {
      return res.status(200).json({ message: "View deleted." });
    })
    .catch(error => {
      return res
        .status(400)
        .json({ message: "Unable to connect to Firestore." });
    });
});
*/



/*
      PUT 

*/

router.put("/delete/:id", (req, res) => {
  const db = req.app.get("db");
  return new Promise(function (resolve, reject) {
    db.collection("Card")
      .doc(req.params.id)
      .set({
        Deleted: moment().unix()
      },
        {
          merge: true
        })
      .then(() => {
        resolve(req.params.id)
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });

  }).then(docID => {
    return new Promise(function (resolve, reject) {
      db.collection("Card")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (docID == doc.id) {
              resolve(doc.data().ViewsID)
            }
          });
          //functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
          return res
            .status(400)
            .json({ message: "Unable to connect to Firestore." });
        });
    }).then(viewsID => {
      console.log(viewsID)
      db.collection("Views")
        .doc(viewsID)
        .set({
          Deleted: moment().unix()
        },
          {
            merge: true
          })
        .then(() => {
          return res.status(200).json({ message: "Deleted date for Card and Views have been updated" });
        })
        .catch(error => {
          return res
            .status(400)
            .json({ message: "Unable to connect to Firestore." });
        });
    })
  })
});

/*
{
	"description": "jakis opis",
	"isHit": false,
	"price": 120.99,
	"isAbleToDrive": false,
	"range": 5,
	"isOnline": false,
	"levelID": "skh0Rn1rvXI5rAeF8sjJ",
	"subjectID": "5e04d570-6dfd-11ea-a51a-e92f5d354da7"
}
*/
router.put("/:id", (req, res) => {
  const db = req.app.get("db");

  let tmp_description = req.body.description;
  let tmp_isAbleToDrive = req.body.isAbleToDrive;
  //let tmp_isHit = req.body.isHit;
  let tmp_isOnline = req.body.isOnline;
  let tmp_price = req.body.price;
  let tmp_range = req.body.range;
  let tmp_status = req.body.status;
  let tmp_subjectID = req.body.subjectID;
  let tmp_levelID = req.body.tmp_levelID;
  
  var update = {};

  if (tmp_description) update["Description"] = tmp_description;
  if (tmp_isAbleToDrive) update["IsAbleToDrive"] = tmp_isAbleToDrive;
  //if (tmp_isHit) update["IsHit"] = tmp_isHit;
  if (tmp_isOnline) update["IsOnline"] = tmp_isOnline;
  if (tmp_price) update["Price"] = tmp_price;
  if (tmp_range) update["Range"] = tmp_range;
  if (tmp_status) update["Status"] = tmp_status;
  if (tmp_subjectID) update["SubjectID"] = tmp_subjectID;
  if (tmp_levelID) update["LevelID"] = tmp_levelID;

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
module.exports = router;
