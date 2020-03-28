var express = require("express");
var router = express.Router();
var helpers = require("./helpers/output");
var functions = require("./helpers/functions");

/*

Province                            /cards/province/Kujawsko-pomorskie
*/

router.get("/:province", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().Province == req.params.province) {
                    output.push(helpers.getOutput(doc))
                }
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

module.exports = router;