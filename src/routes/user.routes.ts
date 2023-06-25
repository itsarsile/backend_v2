import express from "express";
import { getMeHandler, updateMeHandler } from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get("/me", getMeHandler)
      .put("/me", updateMeHandler);

export default router;
