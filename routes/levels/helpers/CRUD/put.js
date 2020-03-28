var helpers = require("../output");

module.exports = {
  putById: function(req, res) {
    const db = req.app.get("db");

    db.collection("Level")
      .doc(req.params.id)
      .set(helpers.putOutput(req))
      .then(() => {
        return res.status(200).json({ message: "Levels updated." });
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  }
};
