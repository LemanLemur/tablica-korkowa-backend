module.exports = {
  getOutput: function(doc) {
    Object.freeze({
      id: doc.id,
      name: doc.data().Name
    });
  },
  postOutput: function(req) {
    Object.freeze({
      Name: req.body.name
    });
  },
  putOutput: function(req) {
    let tmp_value = req.body.name;
    var update = {};

    if (tmp_value) update["Name"] = tmp_value;
    Object.freeze(update, { merge: true });
  }
};
