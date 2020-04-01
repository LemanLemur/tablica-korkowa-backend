var express = require("express");
var router = express.Router();
var deletes = require("./helpers/CRUD/delete");
var gets = require("./helpers/CRUD/get");
var posts = require("./helpers/CRUD/post");
var puts = require("./helpers/CRUD/put");

/* GET Subjects listing. */
router.get("/", function(req, res, next) {
  gets.getAll(req, res);
});

router.get("/:id", function(req, res, next) {
  gets.getById(req, res);
});

router.use("/name", function(req, res, next) {
  gets.getByName(req, res);
});

/* POST Subjects listing. */

router.post("/", (req, res) => {
  posts.post(req, res);
});

/* PUT Subjects listing. */

router.put("/:id", (req, res) => {
  puts.put(req, res);
});

/* DELETE Subjects listing. */

router.delete("/:id", (req, res) => {
  deletes.delete(req, res);
});

module.exports = router;
