const router = require("express").Router();
const Bill = require("../../models/Finance/Bill");
const Report = require("../../models/Finance/Report");
//add new warrenty
router.post("/add", async (req, res) => {
  try {
    //add new report
    const today = formatDate(new Date());
    const newWarrenty = new Report({
      reportID: req.body.reportID,
      reportDate: today,
      reportData: req.body.reportData,
      time: req.body.time,
      duration: req.body.duration,
      TotalSalaryPay: req.body.TotalSalaryPay,
    });

    //save
    const savedWarrenty = await newWarrenty.save();

    res.status(200).json(savedWarrenty);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  Report.find({})
    .then((Reports) => {
      res.status(200).json({ Reports });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  Bill.findById(req.params.id)
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Bill.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Report.findByIdAndDelete(req.params.id)
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});
function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() + 1;
  return [year, month, day].join("-");
}
module.exports = router;
