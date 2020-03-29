import lodash from 'lodash';
import { encryptPassword, decryptPassword } from '../helpers/hashPassword';
import { errorResponse, successResponse } from '../helpers/response';
import { generateAuthToken, userIdFromToken } from '../helpers/token';
import User from '../models/userModel';

export const signUp = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      isAdmin,
    } = req.body;
    password = encryptPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      isAdmin,
    });
    const token = generateAuthToken(
      newUser._id,
      newUser.isAdmin,
      newUser.email,
    );
    const data = {
      token,
      userData: lodash.pick(
        newUser,
        'id',
        'firstName',
        'lastName',
        'email',
        'isAdmin',
      ),
    };
    successResponse(
      res, 201, 'User created successfully', data,
    );
  } catch (error) {
    return errorResponse(res, 400, error);
  }
};
export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userLogin = await User.findOne(
      { $or: [ { email: userName }, { phoneNumber: userName } ] },
    );
    if (userLogin && decryptPassword(password, userLogin.password)) {
      const token = generateAuthToken(
        userLogin._id,
        userLogin.isAdmin,
        userLogin.email,
      );
      const data = {
        token,
        userData: lodash.pick(
          userLogin,
          'id',
          'userType',
          'firstName',
          'lastName',
          'email',
          'isAdmin',
        ),
      };

      return successResponse(res, 200, 'User logged in successfully', data);
    }
    return errorResponse(res, 401, 'Incorrect email or password');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPass } = req.body;
    const userId = userIdFromToken(req.header('x-auth-token'));
    const user = await User.findById(userId);
    if ((newPassword === confirmPass) && (decryptPassword(oldPassword, user.password))) {
      const hashed = encryptPassword(newPassword);
      const newUser = await User.updateOne({ _id: userId },
        { $set: { password: hashed } });
      return successResponse(
        res, 200, 'password changed successfully', newUser,
      );
    }
    return errorResponse(res, 400, 'Incorrect oldPassword');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
