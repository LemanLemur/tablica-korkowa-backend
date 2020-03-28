module.exports = {
  getOutput: function(req) {
    return Object.freeze({
      id: req.id,
      city: req.data().City,
      created: req.data().Created,
      deleted: req.data().Deleted,
      description: req.data().Description,
      endDate: req.data().EndDate,
      isAbleToDrive: req.data().IsAbleToDrive,
      isHit: req.data().IsHit,
      isOnline: req.data().IsOnline,
      levelId: req.data().LevelID,
      price: req.data().Price,
      range: req.data().Range,
      startDate: req.data().StartDate,
      status: req.data().Status,
      subjectID: req.data().SubjectID,
      tittle: req.data().Tittle,
      type: req.data().Type,
      userId: req.data().UserID,
      viewsId: req.data().ViewsID,
      province: req.data().Province
    });
  }
};