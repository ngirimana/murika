import fs from 'fs';
import cloudinary from './cloudinaryUpload';

const upload = async (req) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'houseImages');

  if (req.method === 'POST') {
    const urls = [];
    const { files } = req;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(file.path);
    }
    return urls;
  }
};
export default upload;
