const mongoose = require("mongoose");

const AttendenceSchema = new mongoose.Schema({
  AttendenceId: { type: String, required: true, unique: true },
  Year: { type: String, required: true },
  monthe: { type: String, required: true },
  attandance: [
    {
      EmployeeID: { type: String, required: true },
      Appliedleaves: { type: Number, required: true },
      Nopaylevaves: { type: Number, required: true },
      OTHours: { type: Number, required: true },
      Withleaves: { type: Number, required: true },
      TotalAttendence: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Attendence", AttendenceSchema);
