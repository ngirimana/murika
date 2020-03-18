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
      return successResponse(res, 200, 'House edited successfully', updatedHouse);
    }
    return errorResponse(res, 403, "This house post doesn't belong to you");
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};


export const findAllHouse = async (req, res) => {
  try {
    const houses = await House.find({ status: 'available' });
    if (houses.length) {
      const sortedHouse = houses.sort((a, b) => (new Date(b.postedDate)).getTime()
        - (new Date(a.postedDate).getTime()));
      return successResponse(res, 201, 'Houses retrieved successfully', sortedHouse);
    }
    return errorResponse(res, 404, 'House are not available');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const findOneHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const oneHouse = await House.findById({ _id: houseId, status: 'available' });
    if (oneHouse) {
      return successResponse(res, 200, 'House retrievved successfull', oneHouse);
    }

    return errorResponse(res, 404, 'House is not available');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const rentHouse = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const { houseId } = req.params;
    const SingleHouse = await House.findById({ _id: houseId, status: 'available' });
    if (SingleHouse) {
      const rentedHouse = await House.updateOne({ _id: houseId }, { status: 'rented', renterId: userId });
      return successResponse(res, 200, 'House is rented successfully', rentedHouse);
    }
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const searchHouse = async (req, res) => {
  try {
    const { searchParameter } = req.params;
    const searchResult = await House.find({
      $or: [
        { category: { $regex: `.*${searchParameter}.*` } },
        { 'address.district': { $regex: `.*${searchParameter}.*` } },
        { 'address.sector': { $regex: `.*${searchParameter}.*` } },
        { 'address.cell': { $regex: `.*${searchParameter}.*` } },
        { 'address.village': { $regex: `.*${searchParameter}.*` } },

      ],
    });
    if (searchResult.length) {
      const sortedSearchedHouse = searchResult.sort((a, b) => (new Date(b.postedDate)).getTime()
        - (new Date(a.postedDate).getTime()));
      const data = {
        numberOfHouse: sortedSearchedHouse.length,
        sortedSearchedHouse,
      };
      return successResponse(res, 200, 'job successfully retrieved ', data);
    }
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const getAllRentedHouse = async (req, res) => {
  try {
    const rentedHouse = await House.findById({ status: 'rented' });
    if (rentedHouse) {
      return successResponse(res, 200, 'House retrievved successfull', rentedHouse);
    }

    return errorResponse(res, 404, 'House is not available');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const getRentedHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const oneRentedHouse = await House.findById({ _id: houseId, status: 'rented' });
    if (oneRentedHouse) {
      return successResponse(res, 200, 'House retrieved successfull', oneRentedHouse);
    }

    return errorResponse(res, 404, 'House is not available');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
