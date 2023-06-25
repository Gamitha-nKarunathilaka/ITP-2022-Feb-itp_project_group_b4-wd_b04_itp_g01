const router = require("express").Router();
const mongoose = require("mongoose");
const SparePart = require("../../models/SparePart/spareParts");
const User = require("../../models/User/user");
const objId = mongoose.Types.ObjectId;
const Report = require("../../models/SparePart/Report");
router.get("/usertest", (req, res) => {
  res.send("user data recived");
});

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
      TotalProfit: req.body.TotalProfit,
      Totalexpence: req.body.Totalexpence,
    });

    //save
    const savedMaintain = await newMaintain.save();

    res.status(200).json(savedMaintain);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

//update user profile
router.put("/update/:id", async (req, res) => {
  SparePart.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((SpareParts) => {
      res.status(200).json({ SpareParts });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/getAll", async (req, res) => {
  try {
    const SpareParts = await SparePart.find({});
    res.status(200).json({ SpareParts });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  Report.findByIdAndDelete(req.params.id)
    .then((SpareParts) => {
      res.status(200).json({ SpareParts });
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
