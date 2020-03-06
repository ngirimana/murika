import lodash from 'lodash';
import { encryptPassword, decryptPassword } from '../helpers/hashPassword';
import { errorResponse, successResponse } from '../helpers/response';
import { generateAuthToken } from '../helpers/token';
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
        ),
      };

      return successResponse(res, 200, 'User logged in successfully', data);
    }
    return errorResponse(res, 401, 'Incorrect email or password');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
