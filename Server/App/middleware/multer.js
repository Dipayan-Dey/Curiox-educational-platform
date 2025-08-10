// middleware/multer.js
import multer from "multer";
import { v4 as uuid } from "uuid";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // ❌ OLD: You were adding the file extension to public_id, which caused duplication.
    // const extName = file.originalname.split(".").pop();
    // const uniqueName = `${uuid()}.${extName}`;

    // ✅ FIX: Do NOT add the extension to public_id, Cloudinary adds it automatically.
    const uniqueName = uuid(); // Just UUID without extension

    // Optional improvement: Keep part of the original filename for readability
    // const baseName = file.originalname.split(".").slice(0, -1).join(".");
    // const uniqueName = `${baseName}-${uuid()}`;

    let folder = "general";
    if (file.fieldname === "profilePhoto") folder = "profile_photos";
    else if (file.fieldname === "file") folder = "course_files";

    const isVideo = file.mimetype.startsWith("video/");
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder,
      public_id: uniqueName, // ✅ Will now not have duplicate extensions
      resource_type: isVideo ? "video" : isPdf ? "raw" : "image",
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "video/mp4",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

export const uploadFiles = multer({ storage, fileFilter }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
