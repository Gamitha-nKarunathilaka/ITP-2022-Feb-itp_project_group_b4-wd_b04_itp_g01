const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  employeeName: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
  nic: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  jobRole: { type: String, required: true },
  attandance: [
    {
      year: { type: String, required: true },
      monthe: { type: String, required: true },
      noOfDays: { type: Number, required: true },
    },
  ],
});


module.exports = mongoose.model("Employee", EmployeeSchema);

