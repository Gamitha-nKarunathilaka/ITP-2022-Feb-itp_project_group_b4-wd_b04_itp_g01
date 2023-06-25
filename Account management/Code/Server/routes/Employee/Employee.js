const router = require("express").Router();
const Employee = require("../../models/Employee/Employee");

//add new warrenty
router.post("/add", async (req, res) => {
  try {
    //add new bill
    const newWarrenty = new Employee({
      employeeId: req.body.employeeId,
      employeeName: req.body.employeeName,
      address: req.body.address,
      contactNo: req.body.contactNo,
      nic: req.body.nic,
      basicSalary: req.body.basicSalary,
      jobRole: req.body.jobRole,
      attandance: req.body.attandance,
    });

    //save
    const savedWarrenty = await newWarrenty.save();

    res.status(200).json(savedWarrenty);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  Employee.find({})
    .then((Employees) => {
      res.status(200).json({ Employees });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/getsalary", async (req, res) => {
  Employee.find({}, { basicSalary: 1, employeeId: 1 })
    .then((Employees) => {
      res.status(200).json({ Employees });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/getnames", async (req, res) => {
  Employee.find({}, { employeeName: 1 })
    .then((Employees) => {
      res.status(200).json({ Employees });
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

module.exports = router;
