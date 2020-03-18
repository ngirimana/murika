import User from '../models/userModel';
import { userIdFromToken, isAdminFromToken } from '../helpers/token';
import { errorResponse } from '../helpers/response';

export const verifyIsAdmin = async (req, res, next) => {
  const authToken = req.header('x-auth-token');
  if (!authToken) {
    return errorResponse(res, 400, "You haven't provide your token");
  }
  try {
    const userId = userIdFromToken(authToken);
    const adminUser = isAdminFromToken(authToken);
    const user = await User.findOne({ _id: userId });
    if (user.isAdmin !== adminUser) {
      return errorResponse(
        res,
        401,
        'You are not authorized to perform this task',
      );
    }

    next();
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};
