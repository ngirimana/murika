import User from '../models/userModel';
import { errorResponse } from '../helpers/response';

export const verifyIsVerified = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({
      $or: [{ email: userName }, { phoneNumber: userName }],
    });
    if (!user.isVerified) {
      return errorResponse(
        res,
        401,
        'Your Account Is Not Verified, Please Check Your Mail Box to so.',
      );
    }

    next();
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};
