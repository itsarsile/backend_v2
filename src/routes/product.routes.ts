import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser, requireUserRole } from "../middleware/requireUser";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import { upload } from "../middleware/upload";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .get("/", getAllProductsHandler)
  .get("/:id", getProductByIdHandler)
  .put("/:id", requireUserRole('seller'), updateProductHandler)
  .post("/", requireUserRole('seller'), upload.single("image"), createProductHandler)
  .delete("/:id", requireUserRole('seller'), deleteProductHandler);

export default router;
