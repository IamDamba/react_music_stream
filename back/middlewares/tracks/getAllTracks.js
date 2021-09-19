module.exports = (model) => {
  return async (req, res, next) => {
    let track = {};

    await model.find({}, (err, data) => {
      if (err) res.status(400).json({ message: err.message });
      else {
        track = data;
      }
    }).sort({id: 1});
    res.tracks = track;
    next();
  };
};
