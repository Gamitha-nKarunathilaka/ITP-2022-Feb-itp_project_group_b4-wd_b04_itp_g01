const mongoose = require("mongoose");

const EmployeeReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    TotalAttendence: { type: Number },
    TotalNoPays: { type: Number },
    TotalApplyLeaves: { type: Number },
    reportData: [
      {
        EmployeeID: { type: String },
        Appliedleaves: { type: Number },
        Nopaylevaves: { type: Number },
        OTHours: { type: Number },
        Withleaves: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeReport", EmployeeReportSchema);
