const Tracks = require("../models/Tracks");

module.exports.all_get = async (req, res) => {
  let track = [];

  await Tracks.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    } else {
      if (data) {
        console.log(data);
        res.status(200).send(data);
      } else {
        res.status(400).json({ message: "Error 404" });
      }
    }
  }).sort({ id: -1 });
};

module.exports.list_get = async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.id_get = async (req, res) => {
  let id = parseInt(req.query.id);

  await Tracks.findOne({ id: id }, (err, data) => {
    if (err) {
      console.log("Error 404: ", err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.log(data);
      res.status(200).json({ result: data });
    }
  });
};
