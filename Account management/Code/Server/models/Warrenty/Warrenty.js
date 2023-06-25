const mongoose = require("mongoose");

const WarrentySchema = new mongoose.Schema(
  {
    warrentyNo: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    adddress: { type: String },
    contactNo: { type: String },
    dateOfRepair: { type: Date },
    warrantyTill: { type: Date },
    technician: { type: String },
    technicianContactNo: { type: String },
    vehicalBrand: { type: String },
    vehicalRegistrationNo: { type: String },
    engineCode: { type: String },
    injectorMake: { type: String },
    injectorNo: { type: String },
    injectorCode: { type: String },
    extraDetails: { type: String },
    img: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/Defaultimg%2Fundraw_Images_re_0kll.png?alt=media&token=ee57b9d5-fa04-4d85-8ac0-bd2cb8d04fb0",
    },
    status: { type: String, default: "Valid" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warrenty", WarrentySchema);
