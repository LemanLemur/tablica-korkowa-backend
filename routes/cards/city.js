var express = require("express");
var router = express.Router();
var helpers = require("./helpers/output");

/*
----
/cards/province/:province/city/:city/isAbleToDrive/:isAbleToDrive/isHit/:isHit/isOnline/:isOnline/status/:status/type/:type
----

City                                        /cards/city/Toruń
City && Type                                /cards/city/Toruń/type/0

City && SubjectID                           /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7  -> matematyka. Teraz pytanie czy lepiej będzie przechowywać zamiast SubjectID to SubjectName
City && SubjectID && Type                   /cards/city/Trouń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/type/0
City && SubjectID && LevelID                /cards/city/Trouń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ  -> Czy zmienić na LevelValue
City && SubjectID && LevelID && type        /cards/city/Trouń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0

City && isAbleToDrive                       /cards/city/Toruń/isAbleToDrive/1
City && isOnline                            /cards/city/Toruń/isOnline/1
City && isHit                               /cards/city/Toruń/isHit/1

City && isOnline && isHit                   /cards/city/Toruń/isOnline/1/isHit/1
City && isOnline && isAbleToDrive           /cards/city/Toruń/isOnline/1/isAbleToDrive/1
City && isHit && isAbleToDrive              /cards/city/Toruń/isAbleToDrive/1/isHit/1
City && isOnline && isAbleToDrive && isHit  /cards/city/Toruń/isOnline/1/isAbleToDrive/1/isHit/1
            



*/

router.get("/:city", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
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

router.get("/:city/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().Type == req.params.type) {
                    if (doc.data().City == req.params.city) {
                        output.push(helpers.getOutput(doc));
                    }
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


router.get("/:city/subjectID/:subjectID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];
    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot
                .forEach(doc => {
                    if (doc.data().City == req.params.city) {
                        if (doc.data().SubjectID == req.params.subjectID) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
                    if (output.length === 0) {
                        return res.status(404).json({ message: "Any subjects not found." });
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
});

router.get("/:city/subjectID/:subjectID/levelID/:levelID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().SubjectID == req.params.subjectID) {
                        if (doc.data().LevelID == req.params.levelID) {
                            output.push(helpers.getOutput(doc));

                        }
                    }
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

router.get("/:city/subjectID/:subjectID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().SubjectID == req.params.subjectID) {
                        if (doc.data().Type == req.params.type) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().SubjectID == req.params.subjectID) {
                        if (doc.data().LevelID == req.params.levelID) {
                            if (doc.data().Type == req.params.type) {
                                output.push(helpers.getOutput(doc));
                            }
                        }
                    }
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

router.get("/:city/isAbleToDrive/:isAbleToDrive", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                        output.push(helpers.getOutput(doc));
                    }
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

router.get("/:city/isHit/:isHit", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().IsHit == req.params.isHit) {
                        output.push(helpers.getOutput(doc));
                    }
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

router.get("/:city/isOnline/:isOnline", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().IsOnline == req.params.isOnline) {
                        output.push(helpers.getOutput(doc));
                    }
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

router.get("/:city/isOnline/:isOnline/isHit/:isHit", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().IsOnline == req.params.isOnline) {
                        if (doc.data().IsHit == req.params.isHit) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
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

router.get("/:city/isOnline/:isOnline/isAbleToDrive/:isAbleToDrive", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().IsOnline == req.params.isOnline) {
                        if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
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

router.get("/:city/isOnline/:isOnline/isAbleToDrive/:isAbleToDrive/isHit/:isHit", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().IsOnline == req.params.isOnline) {
                        if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                            if (doc.data().IsHit == req.params.isHit) {
                                output.push(helpers.getOutput(doc));
                            }
                        }
                    }
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

router.get("/:city/isAbleToDrive/:isAbleToDrive/isHit/:isHit", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                        if (doc.data().IsHit == req.params.isHit) {
                            output.push(helpers.getOutput(doc));
                        }

                    }
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



module.exports = router;