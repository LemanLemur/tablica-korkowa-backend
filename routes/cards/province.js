var express = require("express");
var router = express.Router();
var helpers = require("./helpers/output");
var functions = require("./helpers/functions");

/*
----
/province/city/subjectID/levelID/type/status/isAbleToDrive/isOnline/isHit
----

Province                            /cards/province/Kujawsko-pomorskie

Province && City                    /cards/province/Kujawsko-pomorskie/city/Toruń
Province && SubjectID                    
Province && LevelID
Province && Type
Province && Status

Province && City && SubjectID                   /cards/province/Kujawsko-pomorskie/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7
Province && City && LevelID 
Province && City && Type 
Province && City && Status
Province && SubjectID && LevelID  
Province && SubjectID && Type
Province && SubjectID && Status
Province && LevelID && Type
Province && LevelID && Status
Province && Type && Status


Province && City && SubjectID && LevelID        /cards/province/Kujawsko-pomorskie/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ
Province && City && SubjectID && Type           /cards/province/Kujawsko-pomorskie/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/type/0
Province && City && SubjectID && Status
Province && City && LevelID && Type
Province && City && LevelID && Status
Province && City && Type && Status

Province && City && SubjectID && LevelID && Type
Province && City && SubjectID && LevelID && Status

Province && City && SubjectID && LevelID && Type && Status

-Province && City && SubjectID && isAbleToDrive  /cards/province/Kujawsko-pomorskie/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/isAbleToDrive/1
-Province && City && SubjectID && isOnline       /cards/province/Kujawsko-pomorskie/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/isOnline/1
-Province && City && SubjectID && isHit          /cards/province/Kujawsko-pomorskie/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/isHit/1
*/

router.get("/:province", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/subjectID/:subjectID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('SubjectID', '==', req.params.subjectID)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/levelID/:levelID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('LevelID', '==', req.params.levelID)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/levelID/:levelID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('LevelID', '==', req.params.levelID)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/subjectID/:subjectID/levelID/:levelID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('SubjectID', '==', req.params.subjectID)
        .where('LevelID', '==', req.params.levelID)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/subjectID/:subjectID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('SubjectID', '==', req.params.subjectID)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/subjectID/:subjectID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('SubjectID', '==', req.params.subjectID)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});
router.get("/:province/levelID/:levelID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('SubjectID', '==', req.params.subjectID)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/levelID/:levelID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('LevelID', '==', req.params.levelID)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/type/:type/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('Type', '==', req.params.type)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/levelID/:levelID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('LevelID', '==', req.params.levelID)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/levelID/:levelID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('LevelID', '==', req.params.levelID)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/levelID/:levelID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('LevelID', '==', req.params.levelID)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/type/:type/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('Type', '==', req.params.type)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/levelID/LevelID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('LevelID', '==', req.params.levelID)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/levelID/LevelID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('LevelID', '==', req.params.levelID)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))


            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/levelID/LevelID/type/:type/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('LevelID', '==', req.params.levelID)
        .where('Type', '==', req.params.type)
        .where('Status', '==', req.params.status)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/isAbleToDrive/:isAbleToDrive", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('IsAbleToDrive', '==', req.params.isAbleToDrive)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/isOnline/:isOnline", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('IsOnline', '==', req.params.isOnline)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/isHit/:isHit", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('IsHit', '==', req.params.isHit)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
            });
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:province/city/:city/subjectID/:subjectID/levelID/:levelID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .where('Province', '==', req.params.province)
        .where('City', '==', req.params.city)
        .where('SubjectID', '==', req.params.subjectID)
        .where('LevelID', '==', req.params.levelID)
        .where('Type', '==', req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                output.push(helpers.getOutput(doc))
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