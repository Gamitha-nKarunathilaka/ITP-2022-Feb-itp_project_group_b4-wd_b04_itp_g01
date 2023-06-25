const router = require("express").Router();
const Employee = require("../../models/Employee/Employee");
const Attendence = require("../../models/Employee/Attendence");

//add new warrenty
router.post("/add", async (req, res) => {
  try {
    //add new Attendence
    const newWarrenty = new Attendence({
      AttendenceId: req.body.AttendenceId,
      Year: req.body.Year,
      monthe: req.body.monthe,
      attandance: req.body.attandance,
    });

    //save
    const savedWarrenty = await newWarrenty.save();

    res.status(200).json(savedWarrenty);
  } catch (e) {
    return res.status(501).json(e.message);
  }
  console.log(req.body);
});

router.get("/getAll", async (req, res) => {
  Attendence.find({})
    .then((Employees) => {
      res.status(200).json({ Employees });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/get", async (req, res) => {
  const mon = getmonthe();
  Attendence.find({ monthe: mon })
    .then((Attendence) => {
      res.status(200).json({ Attendence });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  Employee.findById(req.params.id)
    .then((Employees) => {
      res.status(200).json({ Employees });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Employees) => {
      res.status(200).json({ Employees });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then((Employees) => {
      res.status(200).json({ Employees });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

function getmonthe() {
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let thismonthe = monthNames[today.getMonth() - 1];
  return thismonthe;
}
module.exports = router;
