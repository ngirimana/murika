import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAuthToken = (id, isadmin, email) => {
  const token = jwt.sign({
    Id: id,
    isAdmin: isadmin,
    userEmail: email,
  },
  process.env.SECRETEKEY, { expiresIn: '1d' });
  return token;
};
