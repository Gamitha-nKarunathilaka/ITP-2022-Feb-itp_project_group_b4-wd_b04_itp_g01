const mongoose = require("mongoose");

const WarrentyReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    TotalClaimed: { type: Number },
    TotalIssue: { type: Number },
    TotalExpired: { type: Number },
    reportData: [
      {
        warrentyNo: { type: String },
        dateofRepair: { type: Date },
        expireDate: { type: Date },
        Status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WarrentyReport", WarrentyReportSchema);
