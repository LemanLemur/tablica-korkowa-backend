module.exports = {
    getImportantOutput: function(req, Name, Avatar, Level) {
      return Object.freeze({
        id: req.id,
        city: req.data().City,
        endDate: req.data().EndDate,
        level: Level,
        price: req.data().Price,
        subject: Name,
        tittle: req.data().Tittle,
        type: req.data().Type,
        avatar: Avatar
      });
    }
  };