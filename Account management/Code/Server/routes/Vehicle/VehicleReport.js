const router = require("express").Router();
const mongoose = require("mongoose");
const Vehicle = require("../../models/Vehicle/Vehicle");
const User = require("../../models/User/user");
const objId = mongoose.Types.ObjectId;
const Report = require("../../models/Vehicle/Report");

router.post("/add", async (req, res) => {
  const today = formatDate(new Date());
  console.log(req.body);
  console.log("vehical");
  try {
    const newVehicle = await Report.create({
      reportID: req.body.reportID,
      reportDate: today,
      reportData: req.body.reportData,
      time: req.body.time,
      duration: req.body.duration,
      TotalProfit: req.body.TotalProfit,
    });
    await newVehicle.save();
    res.status(200).send({ message: "Sucessfully new vehicle added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//update user profile
router.put("/update/:id", async (req, res) => {
  Vehicle.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((warrenties) => {
      res.status(200).json({ warrenties });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

// //update user profile
// router.put("/bid/:id", async (req, res) => {
//   const vehicleid = req.params.id;
//   const id = objId(req.body.uid);
//   try {
//     const user = await User.findById(id);
//     const newVehicle = await Vehicle.findOneAndUpdate(
//       { _id: vehicleid },
//       { $push: { Bid: { uid: req.body.uid, value: req.body.value } } }
//     );
//     res.status(200).send({ message: "Bid Sucessfully Added" });
//   } catch (err) {
//     console.log(err.message);
//   }
// });

//GET ALL
router.get("/all", async (req, res) => {
  try {
    const Reports = await Report.find({});
    res.status(200).json({ Reports });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// //TablePagination
// router.get("/sale", async (req, res) => {
//   try {
//     const { page = 1, limit = 12 } = req.query;
//     console.log(page);
//     const count = await Vehicle.find({}).count();
//     const vehicle = await Vehicle.find({})
//       // .populate("Bid.uid")
//       .limit(limit)
//       .skip(page * limit);
//     console.log(count);
//     res.status(200).json({ count, vehicle });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({ error: "Server Error" });
//   }
// });

//TablePagination
// router.get("/sale/:search", async (req, res) => {
//   try {
//     const search = req.params.search;
//     const { page = 1, limit = 12 } = req.query;
//     console.log(page);
//     const count = await Vehicle.find({ Brand: search }).count();
//     const vehicle = await Vehicle.find({ Brand: search })
//       // .populate("Bid.uid")
//       .limit(limit)
//       .skip(page * limit);
//     console.log(count);
//     res.status(200).json({ count, vehicle });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({ error: "Server Error" });
//   }
// });

router.delete("/delete/:id", async (req, res) => {
  Report.findByIdAndDelete(req.params.id)
    .then((Vehicle) => {
      res.status(200).json({ Vehicle });
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
