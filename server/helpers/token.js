import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAuthToken = (id, isadmin, email) => {
  const token = jwt.sign({
    Id: id,
    isAdmin: isadmin,
    userEmail: email,
  },
  process.env.SECRETEKEY, { expiresIn: '5h' });
  return token;
};
export const userIdFromToken = (token) => {
  const mytoken = jwt.verify(token, process.env.SECRETEKEY);
  return mytoken.Id;
};
export const isAdminFromToken = (token) => {
  const admin = jwt.verify(token, process.env.SECRETEKEY);
  return admin.isAdmin;
};
