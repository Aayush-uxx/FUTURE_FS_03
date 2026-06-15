import express from "express";
import {
  createRequest,
  getMyRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getAllRequestsAdmin,
  updateRequestStatus,
} from "../controller/requestController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createRequest);
router.get("/my-requests", protect, getMyRequests);
router.get("/:id", protect, getRequestById);
router.put("/:id", protect, updateRequest);
router.delete("/:id", protect, deleteRequest);
router.get("/admin/all", protect, admin, getAllRequestsAdmin);
router.put("/admin/:id/status", protect, admin, updateRequestStatus);

export default router;
