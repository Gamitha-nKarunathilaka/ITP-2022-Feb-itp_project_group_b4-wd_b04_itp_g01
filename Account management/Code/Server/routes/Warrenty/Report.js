const router = require("express").Router();
const Warrenty = require("../../models/Warrenty/Warrenty");
const Report = require("../../models/Warrenty/WarrantyReport");
//add new warrenty
router.post("/addReport", async (req, res) => {
  try {
    //add new bill
    const today = formatDate(new Date());
    console.log(today);
    const newWarrenty = new Report({
      reportID: req.body.reportID,
      reportDate: today,
      reportData: req.body.reportData,
      time: req.body.time,
      duration: req.body.duration,
      TotalClaimed: req.body.TotalClaimed,
      TotalIssue: req.body.TotalIssue,
      TotalExpired: req.body.TotalExpired,
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

// router.get("/report", async (req, res) => {
//   let date = new Date();
//   let today = formatDate(date);
//   let month = new Date().getMonth();
//   let prevMonth = date.setMonth(month - 1);
//   let formatPrevMonth = new Date(date.setMonth(month - 1));

//   let lastmonthe = formatDate(formatPrevMonth);
//   Warrenty.updateMany(
//     {
//       warrantyTill: {
//         $lt: new Date(today),
//       },
//       status: { $ne: "Claimed" },
//     },
//     { status: "Expired" }
//   )
//     .then(() => {
//       Warrenty.find({
//         $or: [
//           {
//             updatedAt: {
//               $gte: new Date(lastmonthe),
//               $lte: new Date(today),
//             },
//           },
//           {
//             createdAt: {
//               $gte: new Date(lastmonthe),
//               $lte: new Date(today),
//             },
//           },
//         ],
//       })
//         .then((warrenties) => {
//           res.status(200).json({ warrenties });
//         })
//         .catch((error) => {
//           res.status(501).json(error.message);
//         });
//     })
//     .catch((error) => {
//       res.status(501).json(error.message);
//     });
// });

router.get("/:id", async (req, res) => {
  Report.findById(req.params.id)
    .then((Reports) => {
      res.status(200).json({ Reports });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Report.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Reports) => {
      res.status(200).json({ Reports });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Report.findByIdAndDelete(req.params.id)
    .then((Reports) => {
      res.status(200).json({ Reports });
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
