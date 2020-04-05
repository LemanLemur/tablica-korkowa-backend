module.exports = {
    getImportantOutput: function(req, Name) {
      return Object.freeze({
        id: req.id,
        city: req.data().City,
        endDate: req.data().EndDate,
        levelId: req.data().LevelID,
        price: req.data().Price,
        subject: Name,
        tittle: req.data().Tittle,
        type: req.data().Type
      });
    }
  };