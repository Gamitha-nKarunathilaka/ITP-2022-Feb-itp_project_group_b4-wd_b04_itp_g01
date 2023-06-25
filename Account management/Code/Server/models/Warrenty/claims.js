const mongoose = require("mongoose");
const Employee = require("../Employee/Employee");

const ClaimSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    warrentyNo: { type: String },
    contactNo: { type: String },
    technician: { type: mongoose.SchemaTypes.ObjectId, ref: "Employee" },
    reason: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claims", ClaimSchema);
