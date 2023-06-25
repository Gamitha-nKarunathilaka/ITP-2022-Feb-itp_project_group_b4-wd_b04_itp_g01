const mongoose = require("mongoose");

const InjectorSchema = new mongoose.Schema(
  {
    InjetorID: { type: String, required: true, unique: true },
    InjetorNo: { type: String, required: true },
    InjetorCode: { type: String, required: true },
    EngineCode: { type: String, required: true },
    vehicalBrand: { type: String, required: true },
    InjectorBrand: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Injectors", InjectorSchema);
