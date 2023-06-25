const router = require("express").Router();
const Claims = require("../../models/Warrenty/claims");
const Warrenty = require("../../models/Warrenty/Warrenty");

function validate(req, res, next) {
  const date = new Date();
  const { warrentyNo } = req.body;
  console.log(warrentyNo);
  Warrenty.find({ warrentyNo: warrentyNo })
    .then((warrenties) => {
      const tillDate = new Date(warrenties[0].warrantyTill);
      const valid = warrenties[0].status;
      console.log(date);
      console.log(tillDate);
      if (valid == "Claimed") {
        const error = "Warranty Already Claimed";
        res.status(401).json({ error });
      } else if (tillDate > date) {
        next();
      } else {
        const error = "Warranty Expired";
        res.status(401).json({ error });
      }
    })
    .catch((errors) => {
      const error = "Invalid Waaranty No";
      res.status(401).json({ error });
    });
}

//add new warrenty
router.post("/add", validate, async (req, res) => {
  try {
    //add new bill
    const newWarrenty = new Claims({
      warrentyNo: req.body.warrentyNo,
      customerName: req.body.customerName,
      contactNo: req.body.contactNo,
      technician: req.body.technician,
      reason: req.body.reason,
      status: req.body.status,
    });

    //save
    const savedWarrenty = await newWarrenty.save();

    res.status(200).json(savedWarrenty);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  Claims.find({})
    // .populate("technician", { employeeName: 1, _id: 0 })
    .then((Claimes) => {
      res.status(200).json({ Claimes });
    })
    .catch((error) => {
      res.status(401).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  Claims.findById(req.params.id)
    .then((Claimes) => {
      res.status(200).json({ Claimes });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Claims.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Claimes) => {
      res.status(200).json({ Claimes });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Claims.findByIdAndDelete(req.params.id)
    .then((Claimes) => {
      res.status(200).json({ Claimes });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

module.exports = router;
