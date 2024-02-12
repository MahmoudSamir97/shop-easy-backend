const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user',
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  adresses: [String],
  phoneNumber: String,
  token: String,
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

//  {
//   "userName": "Mahmoud samir",
//   "email": "Mahmoud@iti.com",
//   "password": "abkdje#$@#6",
//   "role": "Admin",
//   "isVerfied": true,
//   "Adresses": ["5th elmasjid elkebber", "10th Imbaba"],
// }
