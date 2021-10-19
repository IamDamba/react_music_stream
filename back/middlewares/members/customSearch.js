module.exports = (model, _id, querySelector) => {
  return async (req, res, next) => {
    let result = null;
    let { search } = req.query;

    const regex = new RegExp(search, "i"); // i for case insensitive

    try {
      if (search.trim() === null || search.trim() === "" || search === " ") {
        const data = await model.find().sort({ _id: 1 }).exec();
        result = { result: data };
        res.paginatedResults = result;
        next();
      } else {
        let datalist = [];
        let dataCatch = [];

        const data = await model
          .find({ querySelector: { $regex: regex } })
          .sort({ _id: 1 })
          .exec();

        for (let value in data) {
          dataCatch.push(data[value].querySelector);
        }

        let dataFilter = (querySelect) => {
          querySelect.filter((v, i) => {
            if (querySelect.indexOf(v) === i) {
              datalist.push(v);
            }
          });
        };

        dataFilter(dataCatch);

        result = {
          result: data,
          autoComplete: datalist,
        };
        res.paginatedResults = result;
        next();
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};
