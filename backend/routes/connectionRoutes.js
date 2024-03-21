import { Router } from "express";
import {contactsWithStatus, createConnection} from "../Controllers/ConnectionsController.js"

const router = Router()

router.get("/:userid", contactsWithStatus);
router.post("/", createConnection);

export default router;