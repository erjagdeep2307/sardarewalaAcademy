import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export const createCloudinaryService = (config) => {
  cloudinary.config(config);

  const uploadImage = (fileBuffer, folder = "events") => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto"
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );

      Readable.from(fileBuffer).pipe(uploadStream);
    });
  };

  const removeImage = async (publicId) => {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      throw new Error("Failed to delete image");
    }
  };

  return {
    uploadImage,
    removeImage
  };
};
