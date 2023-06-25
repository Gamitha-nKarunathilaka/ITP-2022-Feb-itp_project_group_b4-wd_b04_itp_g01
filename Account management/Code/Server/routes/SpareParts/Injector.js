const router = require("express").Router();
const Injector = require("../../models/SparePart/injector");

//add new warrenty
router.post("/addInjector", async (req, res) => {
  try {
    //add new bill
    const newInjector = new Injector({
      InjetorID: req.body.InjetorID,
      InjetorNo: req.body.InjetorNo,
      InjetorCode: req.body.InjetorCode,
      EngineCode: req.body.EngineCode,
      InjectorBrand: req.body.InjectorBrand,
      vehicalBrand: req.body.vehicalBrand,
    });

    //save
    const savedInjector = await newInjector.save();
    console.log("reived1");
    res.status(200).json(savedInjector);
  } catch (e) {
    return res.status(501).json(e.message);
    console.log("reived2");
  }
});

router.get("/getAll", async (req, res) => {
  Injector.find({})
    .then((Injectores) => {
      res.status(200).json({ Injectores });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  Injector.findById(req.params.id)
    .then((Injectores) => {
      res.status(200).json({ Injectores });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Injector.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Injectores) => {
      res.status(200).json({ Injectores });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Injector.findByIdAndDelete(req.params.id)
    .then((Injectores) => {
      res.status(200).json({ Injectores });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

module.exports = router;
