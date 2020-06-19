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
  propertyUses: {
    type: String,
    required: true,
  },
  // 5
  rooms: {
    type: Number,
    required: [ true, 'Enter number of rooms of your house' ],
  },
  // 6
  bedRooms: {
    type: Number,
    required: [ true, 'Enter number of bedrooms of your house' ],
  },
  // 7
  bathRooms: {
    type: Number,
    required: [ true, 'Enter number of bathrooms of your house' ],
  },
  // 8
  area: {
    type: Number,
    required: true,
  },
  // 9
  dimensions: {
    type: String,
    required: true,
  },
  // 10
  monthlyRent: {
    type: Number,
    required: [ true, 'Enter price of house' ],
  },
  // 11
  minimumRentperiod: {
    type: Number,
    required: [ true, 'Enter minimum rent period' ],
  },
  // 12
  priceStatus: {
    type: String,
    required: true,
  },
  // 13
  province: {
    type: String,
    required: true,
  },
  // 14
  district: {
    type: String,
    required: [ true, 'Enter district of your house' ],
  },
  // 15
  sector: {
    type: String,
    required: [ true, 'Enter sector of your house' ],
  },
  // 16
  cell: {
    type: String,
    required: [ true, 'Enter cell of your house' ],
  },
  // 17
  village: {
    type: String,
    required: [ true, 'Enter village of your house' ],
  },
  // 18
  aboutProperty: {
    type: String,
  },
  // 19
  leaseDatails: {
    type: String,
  },
  // 20
  fistName: {
    type: String,
    required: true,
  },
  // 21
  lastName: {
    type: String,
    required: true,
  },
  // 22
  phone: {
    type: String,
  },
  // 23
  email: {
    type: String,
  },
  // 24
  postedDate: {
    type: Date,
    default: Date.now(),
  },
  // 25
  parking: {
    type: Boolean,
  },
  // 26
  gated: {
    type: Boolean,
  },
  // 27
  pets: {
    type: Boolean,
  },
  // 28
  furnished: {
    type: Boolean,
  },
  // 29
  status: {
    type: String,
    default: 'available',
  },
  // 29
  houseVideo: {
    type: Array,
  },
  // 30
  houseImages: {
    type: Array,
    required: true,
  },
});
const houseModel = mongoose.model('House', houseSchema);

export default houseModel;
