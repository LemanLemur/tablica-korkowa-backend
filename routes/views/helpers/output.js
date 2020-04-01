module.exports = {
  getOutput: function(doc) {
    Object.freeze({
      id: doc.id,
      value: doc.data().Value
    });
  },
  putOutput: function(req) {
    let tmp_value = req.body.value;
    var update = {};

    if (tmp_value) update["value"] = tmp_value;
    Object.freeze(update, { merge: true });
  }
};
