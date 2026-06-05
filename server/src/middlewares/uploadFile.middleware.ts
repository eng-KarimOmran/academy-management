import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

export const createUpload = (userId: string, paymentId: string) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `users/${userId}/payments`,
      public_id: paymentId,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 1200, crop: "limit" }],
    } as any,
  });
  
  return multer({ storage });
};
