import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAuthToken = (id, isadmin, email, isverified) => {
  const token = jwt.sign(
    {
      Id: id,
      isAdmin: isadmin,
      userEmail: email,
      isVerified: isverified,
    },
    process.env.SECRETEKEY,
    { expiresIn: '5h' },
  );
  return token;
};
export const generateForgotToken = (id) => {
  const forgotToken = jwt.sign(
    {
      Id: id,
    },
    process.env.FORGOT_PASSWORD_KEY,
    { expiresIn: '30m' },
  );
  return forgotToken;
};

export const userIdFromToken = (token) => {
  const mytoken = jwt.verify(token, process.env.SECRETEKEY);
  return mytoken.Id;
};
export const isAdminFromToken = (token) => {
  const admin = jwt.verify(token, process.env.SECRETEKEY);
  return admin.isAdmin;
};
