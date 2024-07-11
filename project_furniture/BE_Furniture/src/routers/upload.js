import express from "express";
import { deleteImages, uploadImages } from "../controllers/upload";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinaryConfig";
import multer from "multer";

const routerImage = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "project-furniture",
  },
});

const upload = multer({ storage: storage });

routerImage.post("/upload", upload.array("images", 10), uploadImages);
routerImage.delete("/delete-image/:publicId", deleteImages);

export default routerImage;
