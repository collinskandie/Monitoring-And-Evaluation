const Project = require("../models/project.model");
const Strategy = require("../models/strategy.model");

//  register a new project
exports.registerProject = async (req, res, next) => {
  try {
    let { name, strategy, startDate, endDate, createdBy,createdById } = req.body;

    // create new project
    const newProject = new Project({
      name,
      strategy,
      startDate,
      endDate,
      createdBy,
      createdById,
    });

    // save project
    const project = await newProject.save();


    //save the project under specififc strategy in the strategies Model
    Strategy.find({ name: project.strategy }).then((strategy) => {
      let objData = {
        name: project.name,
        projectId: project._id,
        createdBy: project.createdBy
      };

      strategy[0].projects.push(objData);

      Strategy.updateOne({ name: project.strategy }, strategy[0]).then(
        (updatedStrategy) => {
          res.status(200).json({
            type: "success",
            message: "Project Created",
            data: {
              projectId: project._id,
            },
          });
        }
      );
    });
  } catch (error) {
    next(error);
  }
};
