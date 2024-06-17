import cloudinary from './cloudinary';

export const processImage = async (imagePath) => {
  const result = await cloudinary.uploader.upload(imagePath);
  return result;
};
