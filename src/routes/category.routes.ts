import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser, requireUserRole } from "../middleware/requireUser";
import {
  createCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
} from "../controllers/category.controller";
import { upload } from "../middleware/upload";

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .get("/", getAllCategoryHandler)
  .get("/:id", getCategoryByIdHandler)
  .post("/", requireUserRole('admin'), upload.single("image"), createCategoryHandler);

export default router;
