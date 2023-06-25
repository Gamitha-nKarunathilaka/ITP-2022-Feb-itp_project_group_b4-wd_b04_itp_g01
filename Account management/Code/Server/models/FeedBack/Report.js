const mongoose = require("mongoose");

const FeedbackReportSchema = new mongoose.Schema(
  {
    reportID: { type: String, required: true, unique: true },
    reportDate: { type: Date },
    time: { type: String },
    duration: { type: String },
    Avaragerate: { type: Number },
    Totalresponse: { type: Number },
    reportData: [
      {
        Feedbackid: { type: String },
        Feedbackdate: { type: Date },
        Rate: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedbackReport", FeedbackReportSchema);
