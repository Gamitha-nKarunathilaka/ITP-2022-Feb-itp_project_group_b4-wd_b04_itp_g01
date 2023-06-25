const mongoose = require("mongoose");

const SparePartSchema = new mongoose.Schema(
  {
    SparepartID: { type: String, required: true },
    ItemName: { type: String },
    ItemDiscription: { type: String },
    Available: { type: String },
    Used: { type: Number },
    UnitSellingPrice: { type: Number },
    UnitBuyingPrice: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SparePart", SparePartSchema);
