import express from "express";
import multer from "multer";
import { addpets, listpet, removepet } from "../controllers/petController.js";

const petRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

petRouter.post("/add", upload.single("image"), addpets);
petRouter.get("/list", listpet);
petRouter.delete("/delete/:id", removepet);

export default petRouter;
