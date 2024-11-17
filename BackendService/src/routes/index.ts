import express from "express";
import * as ProjectController from "../controllers/ProjectController";
import * as UserController from "../controllers/UserController";
import { authenticate, authorize } from "../middlewares/index";

const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

router.get("/projects", authenticate, ProjectController.getAllProjects);
router.post("/project", authenticate, authorize("user"), ProjectController.createProject);
router.get("/project/:text", authenticate, ProjectController.getProject);
router.put("/project/:text", authenticate, authorize("user"), ProjectController.updateProject);
router.delete("/project/:text", authenticate, authorize("user"), ProjectController.deleteProject);

export default (): express.Router => {
  return router;
};
