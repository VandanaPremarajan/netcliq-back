const mongoose = require("mongoose");
const ROLES = require("../constants/roles");
const UsersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone_number: {
      countryCode: { type: Number, required: true },
      areaCode: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      isoCode: { type: String, required: true },
    },
    email_address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.SUBSCRIBER,
    },
    is_active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", UsersSchema);
