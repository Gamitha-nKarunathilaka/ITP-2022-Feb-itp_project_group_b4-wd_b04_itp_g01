const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../User/user");
const VehicleSchema = new mongoose.Schema(
  {
    VehicleNo: { type: String, required: true, unique: true },
    Price: { type: Number },
    Model: { type: String },
    YearofManufacture: { type: String },
    Brand: { type: String },
    Mileage: { type: Number },
    FuelType: { type: String },
    Color: { type: String },
    Transmission: { type: String },
    EngineCapacity: { type: String },
    Edition: { type: String },
    imgUrl: {
      type: Array,
      default:
        "https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/Defaultimg%2Fundraw_Images_re_0kll.png?alt=media&token=ee57b9d5-fa04-4d85-8ac0-bd2cb8d04fb0",
    },
    Features: [String],
    Bid: [
      {
        value: { type: Number },
        uid: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        bidDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
