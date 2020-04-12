module.exports = {
    getMyCards: function(req, Avatar, Level) {
      return Object.freeze({
        id: req.id,
        city: req.data().City,
        endDate: req.data().EndDate,
        level: Level,
        price: req.data().Price,
        isHit: req.data().IsHit,
        //subject: Name,
        tittle: req.data().Tittle,
        status: req.data().Status,
        type: req.data().Type,
        avatar: Avatar
      });
    }
  };