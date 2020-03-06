import validator from 'validator';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [ true, 'Enter your  name' ],
    trim: true,
  },
  lastName: {
    type: String,
    required: [ true, 'Enter  your  name' ],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [ true, 'Enter your  phone number' ],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [ true, 'Enter your  email' ],
    unique: true,
    lowercase: true,
    validate: [ validator.isEmail, 'Provide valid email' ],
  },
  password: {
    type: String,
    required: [ true, 'please  provide your  password' ],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
