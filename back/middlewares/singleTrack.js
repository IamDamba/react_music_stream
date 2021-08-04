module.exports = (model) => {
  return async (req, res, next) => {
    let id = parseInt(req.query.id);
    let track = {};

    await model.findOne({ id: id }, (err, data) => {
      if (err) res.status(400).json({ message: err.message });
      else {
        track.data = data;
        console.log(track);
      }
    });
    res.queryResults = track;
    next();
  };
};
