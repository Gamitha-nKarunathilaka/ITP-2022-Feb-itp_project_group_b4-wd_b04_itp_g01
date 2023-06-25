const mongoose = require("mongoose");

const SparepartReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    TotalProfit: { type: Number },
    Totalexpence: { type: Number },
    reportData: [
      {
        Sparepartid: { type: String },
        itemname: { type: String },
        Used: { type: Number },
        Available: { type: Number },
        Expence: { type: Number },
        Profit: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SparepartReport", SparepartReportSchema);
