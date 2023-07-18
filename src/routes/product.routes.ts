import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser, requireUserRole } from "../middleware/requireUser";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  getProductByUserHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import { upload } from "../middleware/upload";

const router = express.Router();

router
  .get("/", getAllProductsHandler)
  .get("/:id", getProductByIdHandler)
  .get("/user/:id", getProductByUserHandler)

router.use(deserializeUser, requireUser);

router
  .put("/:id", requireUserRole('seller'), updateProductHandler)
  .post("/", requireUserRole('seller'), upload.single("image"), createProductHandler)
  .delete("/:id", requireUserRole('seller'), deleteProductHandler);

export default router;
