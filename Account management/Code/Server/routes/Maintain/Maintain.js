const router = require("express").Router();
const Maintain = require("../../models/Maintain/Maintain");

//add new warrenty
router.post("/add", async (req, res) => {
  try {
    //add new bill
    const newMaintain = new Maintain({
      MaintainID: req.body.MaintainID,
      date: req.body.date,
      Cost: req.body.Cost,
      Servicecharge: req.body.Servicecharge,
      Total: req.body.Total,
      Status: req.body.Status,
      TechnicianName: req.body.TechnicianName,
      Technician: req.body.Technician,
      workDIscription: req.body.workDIscription,
    });

    //save
    const savedMaintain = await newMaintain.save();

    res.status(200).json(savedMaintain);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/maintainreport", async (req, res) => {
  let date = new Date();
  let today = formatDate(date);
  let month = new Date().getMonth();
  let prevMonth = date.setMonth(month - 1);
  let formatPrevMonth = new Date(date.setMonth(month - 1));

  let lastmonthe = formatDate(formatPrevMonth);
  Maintain.find({
    $or: [
      {
        updatedAt: {
          $gte: new Date(lastmonthe),
          $lte: new Date(today),
        },
      },
      {
        createdAt: {
          $gte: new Date(lastmonthe),
          $lte: new Date(today),
        },
      },
    ],
  })
    .then((Maintains) => {
      res.status(200).json({ Maintains });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/getAll", async (req, res) => {
  Maintain.find({})
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
