const mongoose = require("mongoose");
const Employee = require("../Employee/Employee");
const MaintainSchema = new mongoose.Schema(
  {
    MaintainID: { type: String, required: true },
    date: { type: Date },
    Cost: { type: Number },
    Servicecharge: { type: Number },
    Total: { type: Number },
    Status: { type: String },
    workDIscription: { type: String },
    TechnicianName: { type: String },
    Technician: { type: mongoose.SchemaTypes.ObjectId, ref: "Employee" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintain", MaintainSchema);
