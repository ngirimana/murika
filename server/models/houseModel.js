import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Enter price of house'],
  },
  contact: {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  status: {
    type: String,
    default: 'available',
  },
  address: {
    district: {
      type: String,
      required: [true, 'Enter district of your house'],
    },
    sector: {
      type: String,
      required: [true, 'Enter sector of your house'],
    },
    cell: {
      type: String,
      required: [true, 'Enter cell of your house'],
    },
    village: {
      type: String,
      required: [true, 'Enter village of your house'],
    },
  },
  numberOfRooms: {
    type: Number,
    required: [true, 'Enter number of rooms of your house'],
  },
  category: {
    type: String,
    default: 'cheap',
  },
});
const houseModel = mongoose.model('House', houseSchema);

export default houseModel;
