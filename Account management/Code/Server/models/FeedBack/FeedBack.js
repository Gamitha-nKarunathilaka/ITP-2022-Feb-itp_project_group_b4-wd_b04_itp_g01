const mongoose = require("mongoose");

const FeedBackSchema = new mongoose.Schema(
  {
    Feedback_ID: { type: String, required: true },
    Feedback_Date: { type: String },
    FeedbackMsg: { type: String },
    Rate: { type: Number },
    Uid: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedBack", FeedBackSchema);
