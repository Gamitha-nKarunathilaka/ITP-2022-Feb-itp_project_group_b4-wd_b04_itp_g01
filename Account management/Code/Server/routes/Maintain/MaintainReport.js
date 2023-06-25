const router = require("express").Router();
const Maintain = require("../../models/Maintain/Maintain");
const Report = require("../../models/Maintain/Report");
//add new warrenty
router.post("/add", async (req, res) => {
  const today = formatDate(new Date());
  try {
    //add new bill
    const newMaintain = new Report({
      reportID: req.body.reportID,
      reportDate: today,
      reportData: req.body.reportData,
      time: req.body.time,
      duration: req.body.duration,
      Totalincome: req.body.Totalincome,
      Totalexpence: req.body.Totalexpence,
      TotalProfit: req.body.TotalProfit,
      Totalpending: req.body.Totalpending,
      Totalcomplete: req.body.Totalcomplete,
    });

    //save
    const savedMaintain = await newMaintain.save();

    res.status(200).json(savedMaintain);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  Report.find({})
    .populate("Technician")
    .then((Maintains) => {
      console.log(Maintain);
      res.status(200).json({ Maintains });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  Maintain.findById(req.params.id)
    .then((Maintains) => {
      res.status(200).json({ Maintains });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Maintain.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Maintains) => {
      res.status(200).json({ Maintains });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Maintain.findByIdAndDelete(req.params.id)
    .then((Maintains) => {
      res.status(200).json({ Maintains });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() + 1;
  console.log([year, month, day].join("-"));
  return [year, month, day].join("-");
}
module.exports = router;
