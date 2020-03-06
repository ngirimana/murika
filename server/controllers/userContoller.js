import lodash from 'lodash';
import { encryptPassword } from '../helpers/hashPassword';
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
