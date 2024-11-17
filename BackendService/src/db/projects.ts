import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    repositoryName: {
      type: String,
      required: true,
    },
    details: [
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        userName: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ productName: 1, repositoryName: 1, ownerId: 1 }, { unique: true });

export const ProjectModel = mongoose.model("Project", ProjectSchema);
