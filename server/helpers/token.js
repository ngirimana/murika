import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAuthToken = (id, isadmin, email, firstname, lastname, phone) => {
  const token = jwt.sign({
    Id: id,
    isAdmin: isadmin,
    userEmail: email,
    firstName: firstname,
    lastName: lastname,
    phone,
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
export const emailFromToken = (token) => {
  const data = jwt.verify(token, process.env.SECRETEKEY);
  return data.userEmail;
};
export const fullNameFromToken = (token) => {
  const data = jwt.verify(token, process.env.SECRETEKEY);
  const fullName = [ data.firstName, data.lastName ];
  return fullName.join(' ');
};
export const phoneFromToken = (token) => {
  const data = jwt.verify(token, process.env.SECRETEKEY);
  return data.phone;
};
