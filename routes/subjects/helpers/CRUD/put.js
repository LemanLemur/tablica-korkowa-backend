var helpers = require("../output");

module.exports = {
  putById: function(req, res) {
    const db = req.app.get("db");

    db.collection("Level")
      .doc(req.params.id)
      .set(helpers.putOutput(req))
      .then(() => {
        return res.status(200).json({ message: "Views updated." });
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  },
  putIncrement: function(req, res) {
    const db = req.app.get("db");
    var update = {};
    var views = 0;

    db.collection("Views")
      .doc(req.params.id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          views = doc.data().value;
          views++;
          update["value"] = views;
        });
        if (update.length === 0) {
          return res.status(404).json({ message: "Any views not found." });
        }
      })
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
  }
};
