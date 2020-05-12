import { errorResponse, successResponse } from '../helpers/response';
import House from '../models/houseModel';
import { userIdFromToken, isAdminFromToken } from '../helpers/token';
import upload from '../middlewares/uploads';

export const addHouse = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    let {
      ownerId,
      price,
      phone,
      email,
      status,
      district,
      sector,
      cell,
      village,
      numberOfRooms,
      category,
      houseImages,
    } = req.body;
    ownerId = userId;
    console.log('upload --------------------------------------',ownerId)
    houseImages = await upload(req);
    const newHouse = await House.create({
      ownerId,
      price,
      phone,
      email,
      status,
      district,
      sector,
      cell,
      village,
      numberOfRooms,
      category,
      houseImages,
    });
    console.log('upload --------------------------------------',houseImages)
    return successResponse(res, 200, 'House  posted successfully', newHouse);
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
    const houses = await House.find({ status: 'available' }, { __v: 0 });
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
    const oneHouse = await House.findById({ _id: houseId, status: 'available' }, { __v: 0 });
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
    const SingleHouse = await House.findOne({ _id: houseId, status: 'available' });
    if (SingleHouse && (SingleHouse.ownerId !== userId)) {
      const rentedHouse = await House.updateOne({ _id: houseId }, { status: 'rented', renterId: userId });
      return successResponse(res, 200, 'House is rented successfully', rentedHouse);
    }
    return errorResponse(res, 404, 'House is not available');
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
    }, { __v: 0 });
    if (searchResult.length) {
      const sortedSearchedHouse = searchResult.sort((a, b) => (new Date(b.postedDate)).getTime()
        - (new Date(a.postedDate).getTime()));
      const data = {
        numberOfHouse: sortedSearchedHouse.length,
        sortedSearchedHouse,
      };
      return successResponse(res, 200, 'House successfully retrieved ', data);
    }
    return errorResponse(res, 404, 'There is not any ressult ');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
export const getAllRentedHouse = async (req, res) => {
  try {
    const rentedHouse = await House.find({ status: 'rented' }, { __v: 0 });
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
    const oneRentedHouse = await House.findOne({ _id: houseId, status: 'rented' }, { __v: 0 });
    if (oneRentedHouse) {
      return successResponse(res, 200, 'House retrieved successfull', oneRentedHouse);
    }

    return errorResponse(res, 404, 'House is not available');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};

export const deleteOneHouse = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const isAdmin = isAdminFromToken(req.header('x-auth-token'));
    const { houseId } = req.params;
    const deletableHouse = await House.findById(houseId);
    if ((deletableHouse.ownerId === userId) || isAdmin) {
      const deletedHouse = await House.deleteOne({ _id: houseId });
      return successResponse(res, 200, 'House deleted successfully', deletedHouse);
    }
    return errorResponse(res, 403, "This house post doesn't belong to you");
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
export const HouseIRented = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const myRentedHouses = await House.find({ renterId: userId, status: 'rented' }, { __v: 0 });
    if (myRentedHouses.length) {
      return successResponse(res, 200, 'House that you have rented are available', myRentedHouses);
    }
    return errorResponse(res, 404, 'House that you have rented are not available');
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
export const activateHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const userId = userIdFromToken(req.header('x-auth-token'));
    const house = await House.findOne({ _id: houseId, status: 'rented' });
    if (house && (house.ownerId === userId)) {
      const acttivatedHouse = await House.updateOne({ _id: houseId },
        { status: 'available', renterId: null });
      return successResponse(res, 200, 'House is activated successfully', acttivatedHouse);
    }
    return errorResponse(res, 404, 'House is not found');
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
