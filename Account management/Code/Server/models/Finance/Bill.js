const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    Billl_ID: { type: String, required: true },
    Total: { type: Number },
    date: { type: String },
    ItemCount: { type: Number },

    Item_Used: [
      { id: { type: mongoose.SchemaTypes.ObjectId, ref: "SparePart" } },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
