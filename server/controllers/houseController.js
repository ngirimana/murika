import { errorResponse, successResponse } from '../helpers/response';
import House from '../models/houseModel';
import { userIdFromToken } from '../helpers/token';

export const addHouse = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    let {
      ownerId,
      price,
      contact,
      status,
      address,
      numberOfRooms,
      category,
    } = req.body;
    ownerId = userId;
    const newHouse = await House.create({
      ownerId,
      price,
      contact,
      status,
      address,
      numberOfRooms,
      category,
    });
    return successResponse(res, 201, 'House  posted successfully', newHouse);
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const editHouse = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const { houseId } = req.params;
    const editableHouse = await House.findById(houseId);
    if (editableHouse.ownerId === userId) {
      const updatedHouse = await House.findByIdAndUpdate(houseId, req.body, {
        new: true,
        runValidators: true,
      });
      return successResponse(res, 400, 'House edited successfully', updatedHouse);
    }
    return errorResponse(res, 403, "This job post doesn't belong to you");
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
