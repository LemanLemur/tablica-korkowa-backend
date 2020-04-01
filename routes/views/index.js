var express = require("express");
var router = express.Router();
var gets = require("./helpers/CRUD/get");
var posts = require("./helpers/CRUD/post");
var puts = require("./helpers/CRUD/put");
var deletes = require("./helpers/CRUD/delete");

/* GET Views listing. */
router.get("/", function(req, res, next) {
  gets.getAll(req, res);
});

router.get("/:id", function(req, res, next) {
  gets.getById(req, res);
});

/* POST Views listing. */

router.post("/", (req, res) => {
  posts.post(req, res);
});

/* PUT Views listing. */

router.put("/:id", (req, res) => {
  puts.put(req, res);
});

router.use("/increment", (req, res) => {
  puts.putIncrement(req, res);
});

/* DELETE Views listing. */

router.delete("/:id", (req, res) => {
  deletes.delete(req, res);
});

module.exports = router;
