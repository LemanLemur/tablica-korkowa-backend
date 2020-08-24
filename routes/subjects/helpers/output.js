module.exports = {
  getOutput: function(doc) {
    console.log(doc.data().Name)
    Object.freeze({
      id: doc.id,
      name: doc.data().Name
    });
  },
  postOutput: function(req) {
    Object.freeze({
      Name: req.body.Name
    });
  },
  putOutput: function(req) {
    let tmp_value = req.body.Name;
    var update = {};

    if (tmp_value) update["Name"] = tmp_value;
    Object.freeze(update, { merge: true });
  }
};
