const router = require("express").Router();
const Warrenty = require("../../models/Warrenty/Warrenty");

//add new warrenty
router.post("/addwarrenty", async (req, res) => {
  try {
    //add new bill
    const newWarrenty = new Warrenty({
      warrentyNo: req.body.warrentyNo,
      customerName: req.body.customerName,
      adddress: req.body.adddress,
      contactNo: req.body.contactNo,
      dateOfRepair: req.body.dateOfRepair,
      warrantyTill: req.body.warrantyTill,
      technician: req.body.technician,
      technicianContactNo: req.body.technicianContactNo,
      vehicalBrand: req.body.technicianContactNo,
      vehicalRegistrationNo: req.body.vehicalRegistrationNo,
      engineCode: req.body.engineCode,
      injectorMake: req.body.injectorMake,
      injectorNo: req.body.injectorNo,
      injectorCode: req.body.injectorCode,
      extraDetails: req.body.extraDetails,
      img: req.body.img,
    });

    //save
    const savedWarrenty = await newWarrenty.save();

    res.status(200).json(savedWarrenty);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  Warrenty.find({})
    .then((warrenties) => {
      res.status(200).json({ warrenties });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});
function formatDate(thedate) {
  return (
    thedate.getFullYear() +
    "/" +
    (thedate.getMonth() + 1) +
    "/" +
    thedate.getDate()
  );
}

router.get("/report", async (req, res) => {
  let date = new Date();
  let today = formatDate(date);
  let month = new Date().getMonth();
  let prevMonth = date.setMonth(month - 1);
  let formatPrevMonth = new Date(date.setMonth(month - 1));

  let lastmonthe = formatDate(formatPrevMonth);
  Warrenty.updateMany(
    {
      warrantyTill: {
        $lt: new Date(today),
      },
      status: { $ne: "Claimed" },
    },
    { status: "Expired" }
  )
    .then(() => {
      Warrenty.find({
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
        .then((warrenties) => {
          res.status(200).json({ warrenties });
        })
        .catch((error) => {
          res.status(501).json(error.message);
        });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.post("/reportadd");
router.get("/:id", async (req, res) => {
  Warrenty.findById(req.params.id)
    .then((warrenties) => {
      res.status(200).json({ warrenties });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Warrenty.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((warrenties) => {
      res.status(200).json({ warrenties });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Warrenty.findByIdAndDelete(req.params.id)
    .then((warrenties) => {
      res.status(200).json({ warrenties });
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
