import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
  // 1
  ownerId: {
    type: String,
    required: true,
  },
  // 2
  renterId: {
    type: String,
    required: false,
  },
  // 3
  houseType: {
    type: String,
    required: [ true, 'Enter house type' ],
  },
  // 4
  numberOfRooms: {
    type: Number,
    required: [ true, 'Enter number of rooms of your house' ],
  },
  // 5
  bedRoomsNumber: {
    type: Number,
    required: [ true, 'Enter number of bedrooms of your house' ],
  },
  // 6
  bathRoomsNumber: {
    type: Number,
    required: [ true, 'Enter number of bathrooms of your house' ],
  },
  // 7
  area: {
    type: Number,
  },
  // 8
  dimensions: {
    type: String,
  },
  // 9
  monthlyRent: {
    type: Number,
    required: [ true, 'Enter price of house' ],
  },
  // 10
  minimumRentperiod: {
    type: Number,
    required: [ true, 'Enter minimum rent period' ],
  },
  // 11
  district: {
    type: String,
    required: [ true, 'Enter district of your house' ],
  },
  // 12
  sector: {
    type: String,
    required: [ true, 'Enter sector of your house' ],
  },
  // 13
  cell: {
    type: String,
    required: [ true, 'Enter cell of your house' ],
  },
  // 14
  village: {
    type: String,
    required: [ true, 'Enter village of your house' ],
  },
  // 15
  about: {
    type: String,
  },
  // 16
  leaseDatails: {
    type: String,
  },
  // 17
  fistName: {
    type: String,
    required: true,
  },
  // 18
  lastName: {
    type: String,
    required: true,
  },
  // 19
  phone: {
    type: String,
  },
  // 20
  email: {
    type: String,
  },
  // 21
  postedDate: {
    type: Date,
    default: Date.now(),
  },
  // 22
  uses: {
    type: String,
    required: true,
  },
  priceStatus: {
    type: String,
    required: true,
  },
  parking: {
    type: Boolean,
  },
  gated: {
    type: Boolean,
  },
  pets: {
    type: Boolean,
  },
  province: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'available',
  },
  // 23
  houseImages: {
    type: Array,
    required: true,
  },
});
const houseModel = mongoose.model('House', houseSchema);

export default houseModel;
