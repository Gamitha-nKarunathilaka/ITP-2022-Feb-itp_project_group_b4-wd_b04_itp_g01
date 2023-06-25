const mongoose = require("mongoose");

const ResavationReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    Totalpending: { type: Number },
    Totalreject: { type: Number },
    Totalapprove: { type: Number },
    Totalcomplete: { type: Number },
    reportData: [
      {
        ReservationID: { type: String },
        Resavationdate: { type: Date },
        Status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResavationReport", ResavationReportSchema);
