const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../User/user");
const Vehicle = require("./Vehicle");
const VehicleSaleSchema = new mongoose.Schema(
  {
    VehicleNo: { type: String, required: true, unique: true },
    RegNo: { type: String, required: true, unique: true },
    StartingPrice: { type: Number },
    PriceSold: { type: Number },
    Profit: { type: Number },
    id: { type: mongoose.SchemaTypes.ObjectId, ref: "Vehicle" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VehicleSale", VehicleSaleSchema);
