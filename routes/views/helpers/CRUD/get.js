var helpers = require("../output");

module.exports = {
  getAll: function(req, res) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Level")
      .get()
      .then(snapshot => {
        if (snapshot) {
          snapshot.forEach(doc => {
            console.log(doc);
            output.push(helpers.getOutput(doc));
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
  },

  getById: function(req, res) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Level")
      .doc(req.params.id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
            output.push(helpers.getOutput(doc));
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
  }
};
