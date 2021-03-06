module.exports = {
  deleteById: function(req, res) {
    const db = req.app.get("db");

    db.collection("Level")
      .doc(req.params.id)
      .delete()
      .then(() => {
        return res.status(200).json({ message: "Level deleted." });
      })
      .catch(error => {
        return res
          .status(400)
          .json({ message: "Unable to connect to Firestore." });
      });
  }
};
