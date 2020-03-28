var express = require("express");
var router = express.Router();
var helpers = require("./helpers/output");
var functions = require("./helpers/functions");

/*
----
/city/subjectID/levelID/type/status/isAbleToDrive/isOnline/isHit
----


City                                        /cards/city/Toruń

City && SubjectID                           /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7  -> matematyka. Teraz pytanie czy lepiej będzie przechowywać zamiast SubjectID to SubjectName
City && LevelID                             /cards/city/Toruń/levelID/skh0Rn1rvXI5rAeF8sjJ
City && Type                                /cards/city/Toruń/type/0
City && Status                              /cards/city/Toruń/status/1

City && SubjectID && LevelID                /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ  -> Czy zmienić na LevelValue
City && SubjectID && Type                   /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/type/0
City && SubjectID && Status                 /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/status/1
City && LevelID && Type                     /cards/city/Toruń/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0
City && LevelID && Status                   /cards/city/Toruń/levelID/skh0Rn1rvXI5rAeF8sjJ/status/1
City && Type && Status                      /cards/city/Toruń/type/0/status/1

City && SubjectID && LevelID && Type        /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0
City && SubjectID && LevelID && Status      /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/status/1

City && SubjectID && LevelID && Type && Status /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/status/1

//
        PONIŻESZE REQUESTY SĄ NIEPOTRZEBNE, ZA BARDZO SIĘ MACHNĄŁEM
//

-City && SubjectID && LevelID && Type && IsAbleToDrive    /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/isAbleToDrive/1
-City && SubjectID && LevelID && Type && IsOnline         /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/isOnline/1
-City && SubjectID && LevelID && Type && IsHit            /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/isHit/1

-City && SubjectID && LevelID && Type && IsAbleToDrive && IsOnline           /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/isAbleToDrive/1/isOnline/1
-City && SubjectID && LevelID && Type && IsAbleToDrive && IsHit              /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/isAbleToDrive/1/isHit/1
-City && SubjectID && LevelID && Type && IsOnline && IsHit                   /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/isOnline/1/isHit/1
-City && SubjectID && LevelID && Type && IsAbleToDrive && IsOnline && IsHit  /cards/city/Toruń/subjectID/5e04d570-6dfd-11ea-a51a-e92f5d354da7/levelID/skh0Rn1rvXI5rAeF8sjJ/type/0/isAbleToDrive/1/isOnline/1/isHit/1

-City && isAbleToDrive                       /cards/city/Toruń/isAbleToDrive/1
-City && isOnline                            /cards/city/Toruń/isOnline/1
-City && isHit                               /cards/city/Toruń/isHit/1

-City && isOnline && isHit                   /cards/city/Toruń/isOnline/1/isHit/1
-City && isOnline && isAbleToDrive           /cards/city/Toruń/isOnline/1/isAbleToDrive/1
-City && isHit && isAbleToDrive              /cards/city/Toruń/isAbleToDrive/1/isHit/1
-City && isOnline && isAbleToDrive && isHit  /cards/city/Toruń/isOnline/1/isAbleToDrive/1/isHit/1
            



*/
/*
function getSubjectName(SubjectID, req) {
    return new Promise(function (resolve, reject) {
        const db = req.app.get("db");
        var output = [];
        var x = 7;
        db.collection("Subject")
            .get()
            .then(snapshot2 => {
                snapshot2.forEach(doc2 => {
                    if (doc2.id == SubjectID) {
                        resolve(doc2.data().Name)
                    }
                })
            })

    })

}
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
            functions.checkStatusAndReturnJson(output, res)
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
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().SubjectID == req.params.subjectID) {
                        output.push(helpers.getOutput(doc));
                    }
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

router.get("/:city/levelID/:levelID", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().LevelID == req.params.levelID) {
                        output.push(helpers.getOutput(doc));
                    }
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

router.get("/:city/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().Type == req.params.type) {
                        output.push(helpers.getOutput(doc));
                    }
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

router.get("/:city/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().Status == req.params.status) {
                        output.push(helpers.getOutput(doc));
                    }
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
            functions.checkStatusAndReturnJson(output, res)
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
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:city/subjectID/:subjectID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().SubjectID == req.params.subjectID) {
                        if (doc.data().Status == req.params.status) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
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

router.get("/:city/levelID/:levelID/type/:type", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().LevelID == req.params.levelID) {
                        if (doc.data().Type == req.params.type) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
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

router.get("/:city/levelID/:levelID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().LevelID == req.params.levelID) {
                        if (doc.data().Status == req.params.status) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
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

router.get("/:city/type/:type/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().Type == req.params.type) {
                        if (doc.data().Status == req.params.status) {
                            output.push(helpers.getOutput(doc));
                        }
                    }
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
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});

router.get("/:city/subjectID/:subjectID/levelID/:levelID/status/:status", function (req, res, next) {
    const db = req.app.get("db");
    var output = [];

    db.collection("Card")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().City == req.params.city) {
                    if (doc.data().SubjectID == req.params.subjectID) {
                        if (doc.data().LevelID == req.params.levelID) {
                            if (doc.data().Status == req.params.status) {
                                output.push(helpers.getOutput(doc));
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/status/:status", function (req, res, next) {
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
                                if (doc.data().Status == req.params.status) {
                                    output.push(helpers.getOutput(doc));
                                }
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/isAbleToDrive/:isAbleToDrive", function (req, res, next) {
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
                                if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                                    output.push(helpers.getOutput(doc));
                                }
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/isOnline/:isOnline", function (req, res, next) {
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
                                if (doc.data().IsOnline == req.params.isOnline) {
                                    output.push(helpers.getOutput(doc));
                                }
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/isHit/:isHit", function (req, res, next) {
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
                                if (doc.data().IsHit == req.params.isHit) {
                                    output.push(helpers.getOutput(doc));
                                }
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/isAbleToDrive/:isAbleToDrive/isOnline/:isOnline", function (req, res, next) {
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
                                if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                                    if (doc.data().IsOnline == req.params.isOnline) {
                                        output.push(helpers.getOutput(doc));
                                    }
                                }
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/isAbleToDrive/:isAbleToDrive/isHit/:isHit", function (req, res, next) {
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
                                if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                                    if (doc.data().IsHit == req.params.isHit) {
                                        output.push(helpers.getOutput(doc));
                                    }
                                }
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/isOnline/:isOnline/isHit/:isHit", function (req, res, next) {
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
                                if (doc.data().IsOnline == req.params.isOnline) {
                                    if (doc.data().IsHit == req.params.isHit) {
                                        output.push(helpers.getOutput(doc));
                                    }
                                }
                            }
                        }
                    }
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

router.get("/:city/subjectID/:subjectID/levelID/:levelID/type/:type/isAbleToDrive/:isAbleToDrive/isOnline/:isOnline/isHit/:isHit", function (req, res, next) {
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
                                if (doc.data().IsAbleToDrive == req.params.isAbleToDrive) {
                                    if (doc.data().IsOnline == req.params.isOnline) {
                                        if (doc.data().IsHit == req.params.isHit) {
                                            output.push(helpers.getOutput(doc));
                                        }
                                    }
                                }
                            }

                        }
                    }
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
            functions.checkStatusAndReturnJson(output, res)
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
            functions.checkStatusAndReturnJson(output, res)
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
            functions.checkStatusAndReturnJson(output, res)
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
            functions.checkStatusAndReturnJson(output, res)
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
            functions.checkStatusAndReturnJson(output, res)
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
            functions.checkStatusAndReturnJson(output, res)
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
            functions.checkStatusAndReturnJson(output, res)
        })
        .catch(error => {
            return res
                .status(400)
                .json({ message: "Unable to connect to Firestore." });
        });
});



module.exports = router;