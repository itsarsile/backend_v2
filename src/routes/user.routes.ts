import express from "express";
import { getMeHandler, updateMeHandler } from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  createOrderHandler,
  deleteOrderHandler,
  getOrderHandler,
} from "../controllers/order.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get("/me", getMeHandler)
  .put("/me", updateMeHandler);

router.post("/me/orders", createOrderHandler)
  .get("/me/orders", getOrderHandler)
  .delete("/me/orders/:id", deleteOrderHandler);

export default router;
