const mongoose = require("mongoose");

const VehicleReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    TotalProfit: { type: Number },
    reportData: [
      {
        VehicleID: { type: String },

        sellDate: { type: Date },
        Selling: { type: Number },
        Starting: { type: Number },
        Profit: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("VehicleReport", VehicleReportSchema);
