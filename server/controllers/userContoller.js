import lodash from 'lodash';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { encryptPassword, decryptPassword } from '../helpers/hashPassword';
import { errorResponse, successResponse } from '../helpers/response';
import {
  generateAuthToken,
  generateForgotToken,
  userIdFromToken,
  userReesetId,
} from '../helpers/token';
import User from '../models/userModel';
import House from '../models/houseModel';
import { sendEmails, forgotPasswordEmails } from '../helpers/sendEmail';

dotenv.config();

export const signUp = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      userType,
      emailToken,
    } = req.body;
    password = encryptPassword(password);
    emailToken = crypto.randomBytes(64).toString('hex');
    const existUser = await User.find({ email, phoneNumber });
    if (existUser.length) {
      return errorResponse(res, 409, 'Email or phone number has been used');
    }
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      isAdmin: false,
      userType,
      emailToken,
      isVerified: false,
      resetToken: '',
    });
    const data = lodash.pick(
      newUser,
      'id',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'isAdmin',
      'userType',
      'emailToken',
      'isVerified',
      'resetToken',
    );
    const url = req.headers.host;
    await sendEmails(newUser.email, newUser.firstName, newUser.emailToken, url);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data,
    });
  } catch (error) {
    return errorResponse(res, 400, error);
  }
};
export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userLogin = await User.findOne({
      $or: [{ email: userName }, { phoneNumber: userName }],
    });
    if (userLogin && decryptPassword(password, userLogin.password)) {
      const token = generateAuthToken(
        userLogin._id,
        userLogin.isAdmin,
        userLogin.email,
        userLogin.isVerified,
      );
      const data = lodash.pick(
        userLogin,
        'id',
        'userType',
        'firstName',
        'lastName',
        'phoneNumber',
        'email',
        'isAdmin',
        'userType',
        'emailToken',
        'resetToken',
        'isVerified',
        'resetToken',
      );
      return res.status(200).json({
        status: 200,
        message: 'User logged in successfully',
        token,
        data,
      });
    }
    return errorResponse(res, 401, 'Incorrect email or password');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPass } = req.body;
    const userId = userIdFromToken(req.header('Authorization'));
    const user = await User.findById(userId);
    if (
      newPassword === confirmPass
      && decryptPassword(oldPassword, user.password)
    ) {
      const hashed = encryptPassword(newPassword);
      const newUser = await User.updateOne(
        { _id: userId },
        { $set: { password: hashed } },
      );
      return successResponse(
        res,
        200,
        'password changed successfully',
        newUser,
      );
    }
    return errorResponse(res, 400, 'Incorrect oldPassword');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const viewProfile = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('Authorization'));
    const userProfile = await User.find(
      { _id: userId },
      { password: 0, __v: 0, _id: 0 },
    );
    if (userProfile.length) {
      const myHouses = await House.find({ ownerId: userId }, { __v: 0 });
      if (myHouses.length) {
        const data = {
          userProfile,
          HouseNumber: myHouses.length,
          myHouses,
        };
        return successResponse(
          res,
          200,
          'User profile retrieved successfully',
          data,
        );
      }
      return errorResponse(res, 404, "You don't have House");
    }
    return errorResponse(res, 404, 'User Profile is not available');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { searchId } = req.params;
    const user = await User.findById(searchId);

    if (user) {
      const userToDelete = await User.deleteOne({ _id: searchId });
      return successResponse(
        res,
        200,
        'User deleted successfully',
        userToDelete,
      );
    }
    return errorResponse(res, 404, 'User is not found');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const allUser = async (req, res) => {
  try {
    const users = await User.find({ __v: 0 });
    if (users) {
      return successResponse(res, 200, 'users are found', users);
    }
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { mailToken } = req.params;
    const user = await User.find({ emailToken: mailToken.toString() });
    if (user.length) {
      await User.updateOne(
        { emailToken: mailToken.toString() },
        { emailToken: '', isVerified: true },
      );
      return res.status(200).json({
        ' message': 'User verified successfully',

      });
    }
    return errorResponse(res, 404, "User with this email token doesn't exist");
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const forgotPassward = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const url = req.headers.host;
    const user = await User.find({ email: userEmail });
    if (user.length) {
      const token = generateForgotToken(user[0]._id);
      const updatedUser = await User.updateOne(
        { email: userEmail },
        { resetToken: token },
      );
      await forgotPasswordEmails(user[0].email, user[0].firstName, token, url);
      return successResponse(res, 200, 'Check your email box to rest password', updatedUser);
    }
    return errorResponse(
      res,
      404,
      'User assocciated with this email is not found',
    );
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPass } = req.body;
  try {
    if (resetToken) {
      if (userReesetId(resetToken)) {
        const user = await User.find({ resetToken: resetToken.toString() });
        if (user.length) {
          const newUserData = await User.updateOne({ resetToken: resetToken.toString() }, { password: encryptPassword(newPass), resetToken: '' });
          return successResponse(res, 200, 'Password has been Changed Successfully', newUserData);
        }
        return errorResponse(res, 404, 'User with this token is not found');
      }
      return errorResponse(res, 401, 'Incorrect token or it\'s been expired');
    }
    return errorResponse(res, 400, 'Token\'s not been provided');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
