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
          const imageFeature = {
              secure: true,
              folder: folder,
              fetch_format: "webp",
              quality: "auto",
          }
          if(folder.includes("Testo"))
          {
            imageFeature.folder= folder,
            imageFeature.width=155,
            imageFeature.height= 155,
            imageFeature.crop="auto",
            imageFeature.gravity="auto"
            imageFeature.quality="80"
          }
          const optimizedUrl = cloudinary.url(result.public_id,imageFeature);
          resolve({...result,optimizedUrl});
        }
      );

      Readable.from(fileBuffer).pipe(uploadStream);
    });
  };

  const removeImage = async (publicId) => {
    // try {
      return await cloudinary.uploader.destroy(publicId);
    // } catch (err) {
    //   throw new Error("Failed to delete image");
    // }
  };

  return {
    uploadImage,
    removeImage
  };
};
