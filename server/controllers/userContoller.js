import lodash from 'lodash';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { encryptPassword, decryptPassword } from '../helpers/hashPassword';
import { errorResponse, successResponse } from '../helpers/response';
import { generateAuthToken, userIdFromToken } from '../helpers/token';
import User from '../models/userModel';
import House from '../models/houseModel';

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
      isVerfied: false,
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
      'isVerfied',
    );
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'ngirimanaschadrack@gmail.com',
      from: process.env.FROM, // Use the email address or domain you verified above
      subject: 'Verify Your Email Address',
      text: `Hello ${newUser.firstName}, thank you for registering on our site.
      Please copy link address below and paste in your browser to verify your account.
      http://${req.headers.host}/verify?token=${newUser.emailToken}`,
      html: `
      <h1>Hello ${newUser.firstName} </h1>
      <p>thank you for registering on our site.</p>
      <p>Please copy link address below and paste in your browser to verify your account.</p>
      <a href="http://${req.headers.host}/api/v1/auth/verify-email/${newUser.emailToken}"> Verify Your Account</a>
      `,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      process.stdout.write(error);

      if (error.response) {
        process.stdout.write(error.response.body);
      }
    }
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
        userLogin.isVerfied,
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
        'isVerfied',
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
