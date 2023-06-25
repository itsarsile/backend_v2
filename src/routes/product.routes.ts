import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
} from "../controllers/product.controller";
import { upload } from "../middleware/upload";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .get("/", getAllProductsHandler)
  .get("/:id", getProductByIdHandler)
  .post("/", upload.single("image"), createProductHandler)
  .delete("/:id", deleteProductHandler);

export default router;
