const Strategy = require("../models/strategy.model");

// get all strategies
exports.allStrategies = async (req, res, next) => {
  try {
    Strategy.find({})
      .then((strategies) => {
        res.json(strategies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    next(error);
  }
};
exports.myStrategies = async (req, res, next) => {
  try {
    let userId = req.params.id;
    Strategy.find({ createdById: userId })
    .then((strategies) => {
      console.log(strategies);
      res.json(strategies);
      // console.log(res);
    })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    next(error);
  }
};

// add strategy
exports.addStrategy = async (req, res, next) => {
  try {
    // const createdBy = req.session.id;
    let { name, description, createdBy, createdById } = req.body;
    const newStategy = new Strategy({
      name,
      description,
      createdBy,
      createdById,
    });    // save strategy
    const strategy = await newStategy.save();
    console.log(strategy);
    res.status(200).json({
      type: "success",
      message: "Strategy created",
      data: {
        strategy: strategy._id,
      },
    });
  } catch (error) {
    next({ type: "error", message: error });
  }
};
