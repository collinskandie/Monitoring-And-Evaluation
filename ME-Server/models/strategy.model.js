const { model, Schema } = require("mongoose");

const strategySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdById: {
      type: String,
      required: true,
      trim: true,
    },
    projects: [
      {
        name: {
          type: String,
        },
        projectId: {
          type: String,
        },
        createdBy: {
          type: String,
        },
        subProjects: [
          {
            name: {
              type: String,
            },
            taskId: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Strategy", strategySchema);
