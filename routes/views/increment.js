var express = require("express");
var router = express.Router();

router.put("/:id", (req, res) => {
    const db = req.app.get("db");
    var update = {};
    var views = 0;
  
    db.collection("Views")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == req.params.id) {
            views = doc.data().value;
            views ++;
            update["value"] = views;
          }
        });
        if (update.length === 0) {
          return res.status(404).json({ message: "Any views not found." });
        }})
        .then(() => {
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
         });
    });
    
module.exports = router;