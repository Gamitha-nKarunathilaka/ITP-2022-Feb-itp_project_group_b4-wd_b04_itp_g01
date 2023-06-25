const mongoose = require("mongoose");

const MaintainReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    Totalincome: { type: Number },
    Totalexpence: { type: Number },
    TotalProfit: { type: Number },
    Totalpending: { type: Number },
    Totalcomplete: { type: Number },
    reportData: [
      {
        MaintainID: { type: String },
        date: { type: Date },
        Cost: { type: Number },
        Servicecharge: { type: Number },
        Total: { type: Number },
        Status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintainReport", MaintainReportSchema);
