module.exports = {
  getOutput: function(doc) {
    Object.freeze({ id: doc.id, value: doc.data().Value });
  },
  postOutput: function(req){
    Object.freeze({
        Value: req.body.value,
      })
  },
  putOutput: function(req){
    let tmp_value = req.body.value;
    var update = {};
    if (tmp_value) update["Value"] = tmp_value;
    Object.freeze(
        update, { merge: true }
    )
  }
};
