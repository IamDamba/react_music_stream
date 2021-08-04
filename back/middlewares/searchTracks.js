module.exports = (model) => {
  return async (req, res, next) => {
    let result = null;
    let { search } = req.query;

    const regex = new RegExp(search, "i"); // i for case insensitive

    try {
      if (search.trim() === null || search.trim() === "" || search === " ") {
        const tracks = await model.find().sort({ id: 1 }).exec();
        result = { result: tracks };
        res.paginatedResults = result;
        next();
      } else {
        let tagslist = [];
        let tagsCatch = [];

        const tracks = await model
          .find({ tag: { $regex: regex } })
          .sort({ id: 1 })
          .exec();

        for (let track in tracks) {
          tagsCatch.push(tracks[track].tag);
        }

        let tagsFilter = (tags) => {
          tags.filter((v, i) => {
            if (tags.indexOf(v) === i) {
              tagslist.push(v);
            }
          });
        };

        tagsFilter(tagsCatch);

        result = {
          result: tracks,
          autoComplete: tagslist,
        };
        res.paginatedResults = result;
        next();
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};
