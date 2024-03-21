import { Router } from "express";
import { createUser, getUser } from "../Controllers/UserController.js";
import multer from "multer";
import {v4 as uuidv4} from "uuid";

const router = Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Set the temporary storage directory
    },
    filename: function (req, file, cb) {
      const uniqueFilename = uuidv4() + '_' + file.originalname;
      cb(null, uniqueFilename);
    }
  });
  
const upload = multer({ storage: storage });

router.post("/", upload.single('profile_image_url'), createUser);
router.get("/:phone", getUser)

export default router;