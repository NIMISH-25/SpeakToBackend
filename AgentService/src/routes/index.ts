const express = require("express");

const router = express.Router();

const controller = require("../controllers/index");

router.get("/", controller.index);

router.post("/userQuery", (req: any, res: any) => {
  controller.userQuery(req, res);
});

router.post("/runQuery", (req: any, res: any) => {
  controller.runQuery(req, res);
});

export default router;
