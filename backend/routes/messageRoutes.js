import { Router } from "express";
import { createMessage, retrieveMessage } from "../Controllers/MessageController.js";

const router = Router()

router.get("/:user1/:user2", retrieveMessage);
router.post("/", createMessage);

export default router;