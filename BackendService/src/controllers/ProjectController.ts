import express from "express";
import { ProjectModel } from "../db/projects";

export const getAllProjects = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { role, id } = request.user;

    const projects =
      role === "admin"
        ? await ProjectModel.find()
        : await ProjectModel.find({ ownerId: id });

    return response.status(200).json({ data: projects });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const getProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { text } = request.params;
    const user = request.user;
    const searchText = String(text);
    const project = await ProjectModel.findOne({
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { repositoryName: { $regex: searchText, $options: "i" } },
      ],
    });

    if (!project) {
      return response.status(404).json({ message: "Project not found" });
    }

    const isAdmin = user.role === "admin";
    const isOwner = project.ownerId?.toString() === user.id;

    if (!isAdmin && !isOwner) {
      return response.status(403).json({ message: "Access denied" });
    }

    return response.status(200).json({ data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { productName, repositoryName, details } = request.body;
    const { id } = request.user;

    const project = new ProjectModel({
      productName,
      repositoryName,
      details,
      ownerId: id,
    });

    await project.save();
    return response.status(201).json({ message: "Project Created", data: project });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const updateProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { text } = request.params;
    const { details } = request.body;
    const { role, id } = request.user;
    const searchText = String(text);

    const project = await ProjectModel.findOne({
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { repositoryName: { $regex: searchText, $options: "i" } },
      ],
    });

    if (!project || (role !== "admin" && project.ownerId.toString() !== id)) {
      return response.status(403).json({ message: "Access denied" });
    }

    project.details = details;
    await project.save();

    return response
      .status(200)
      .json({ message: "Project Updated", data: project });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const deleteProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { text } = request.params;
    const { role, id } = request.user;
    const searchText = String(text);

    const project = await ProjectModel.findOne({
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { repositoryName: { $regex: searchText, $options: "i" } },
      ],
    });

    if (!project || (role !== "admin" && project.ownerId.toString() !== id)) {
      return response.status(403).json({ message: "Access denied" });
    }

    await project.deleteOne();

    return response.status(200).json({ message: "Project Deleted" });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};
