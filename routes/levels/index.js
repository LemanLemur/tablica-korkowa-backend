var express = require("express");
var router = express.Router();
var deletes = require("./helpers/CRUD/delete");
var gets = require("./helpers/CRUD/get");
var posts = require("./helpers/CRUD/post");
var puts = require("./helpers/CRUD/put");

/* GET Levels listing. */
router.get("/", function(req, res, next) {
  gets.getAll(req, res);
});

router.get("/:id", function(req, res, next) {
  gets.getById(req, res);
});

/* POST Levels listing. */

router.post("/", (req, res) => {
  posts.post(req, res);
});

/* PUT Levels listing. */

router.put("/:id", (req, res) => {
  puts.putById(req, res);
});

/* DELETE Levels listing. */

router.delete("/:id", (req, res) => {
  deletes.deleteById(req, res);
});

module.exports = router;
