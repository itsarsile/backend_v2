import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  createCategoryHandler,
  getAllCategoryHandler,
} from "../controllers/category.controller";
import { upload } from "../middleware/upload";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .get("/", getAllCategoryHandler)
  .post("/", upload.single("image"), createCategoryHandler);

export default router;
