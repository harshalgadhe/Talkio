import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import MessageRoutes from './messageRoutes.js'
import ConnectionRoutes from './connectionRoutes.js'

const router = Router();

router.use("/api/user", UserRoutes);
router.use("/api/message", MessageRoutes);
router.use("/api/connections", ConnectionRoutes)

export default router;