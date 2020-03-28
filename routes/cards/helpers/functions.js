module.exports = {
checkStatusAndReturnJson: function(output, res){
    if (output.length === 0) {
        return res.status(404).json({ message: "Any levels not found." });
    } else {
        return res.status(200).json(output);
    }
  }
}