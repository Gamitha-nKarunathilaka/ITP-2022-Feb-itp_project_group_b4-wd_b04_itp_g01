const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    ReservationID: { type: String, required: true },
    title: { type: String },
    name: { type: String },
    mobileNo: { type: String },
    serviceType: { type: String },
    date: { type: String },
    Time: { type: String },
    vehicleRegistationNo: { type: String },
    mileage: { type: Number },
    mileageUnit: { type: String },
    comment: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
