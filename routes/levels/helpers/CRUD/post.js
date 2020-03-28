var helpers = require("../output");

module.exports = {
  post: function(req, res) {
    const db = req.app.get("db");

    db.collection("Level")
      .add(helpers.postOutput(req))
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
  }
};
