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
  propertyType: {
    type: String,
    required: [ true, 'Enter house type' ],
  },
  // 4
  rooms: {
    type: Number,
    required: [ true, 'Enter number of rooms of your house' ],
  },
  bedRooms: {
    type: Number,
    required: [ true, 'Enter number of bedrooms of your house' ],
  },
  bathRooms: {
    type: Number,
    required: [ true, 'Enter number of bedrooms of your house' ],
  },
  size: {
    type: String,
  },
  // 5
  monthlyRent: {
    type: Number,
    required: [ true, 'Enter price of house' ],
  },
  // 6
  minimumRentperiod: {
    type: Number,
    required: [ true, 'Enter minimum rent period' ],
  },
  // 7
  priceStatus: {
    type: String,
    required: true,
  },
  // 8
  aboutProperty: {
    type: String,
  },
  // 9
  leaseDatails: {
    type: String,
  },
  // 10
  district: {
    type: String,
    required: [ true, 'Enter district of your house' ],
  },
  // 11
  sector: {
    type: String,
    required: [ true, 'Enter sector of your house' ],
  },
  // 12
  cell: {
    type: String,
    required: [ true, 'Enter cell of your house' ],
  },
  // 13
  fullName: {
    type: String,
    required: true,
  },
  // 14
  phone: {
    type: String,
    required: true,
  },
  // 15
  email: {
    type: String,
    required: true,
  },
  // 16
  postedDate: {
    type: Date,
    default: Date.now(),
  },
  // 17
  parking: {
    type: Boolean,
  },

  // 18
  furnished: {
    type: Boolean,
  },
  // 19
  gated: {
    type: Boolean,
  },
  // 20
  status: {
    type: String,
    default: 'available',
  },
  // 21
  houseVideo: {
    type: String,
  },
  // 22
  houseImages: {
    type: Array,
    required: true,
  },
});
const houseModel = mongoose.model('House', houseSchema);

export default houseModel;
