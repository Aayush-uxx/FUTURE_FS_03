import { createRequest, getRequests } from "../controller/requestController.js";
import express from "express";
const router = express.Router();
router.post("/create", createRequest);
router.get("/:email", getRequests);

export default router;
