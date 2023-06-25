const mongoose = require("mongoose");

const EmployeeSalaryReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    TotalSalaryPay: { type: Number },
    reportData: [
      {
        EmployeeID: { type: String },
        TotalAttendence: { type: Number },
        OTHoursTotal: { type: Number },
        OTHours: { type: Number },
        TotalSalry: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmpSalaryReport", EmployeeSalaryReportSchema);
