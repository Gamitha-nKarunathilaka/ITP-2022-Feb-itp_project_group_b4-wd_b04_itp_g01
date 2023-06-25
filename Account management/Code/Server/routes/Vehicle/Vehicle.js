const router = require("express").Router();
const mongoose = require("mongoose");
const Vehicle = require("../../models/Vehicle/Vehicle");
const User = require("../../models/User/user");
const objId = mongoose.Types.ObjectId;

router.post("/add", async (req, res) => {
  try {
    const newVehicle = await Vehicle.create({
      VehicleNo: req.body.VehicleNo,
      Price: req.body.Price,
      Model: req.body.Model,
      YearofManufacture: req.body.YearofManufacture,
      Mileage: req.body.Mileage,
      Brand: req.body.Brand,
      Bid: req.body.Bid,
      FuelType: req.body.FuelType,
      Color: req.body.Color,
      Transmission: req.body.Transmission,
      EngineCapacity: req.body.EngineCapacity,
      Edition: req.body.Edition,
      Features: req.body.Features,
      imgUrl: req.body.imgUrl,
    });
    await newVehicle.save();
    res.status(200).send({ message: "Sucessfully new vehicle added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/report", async (req, res) => {
  let date = new Date();
  let today = formatDate(date);
  let month = new Date().getMonth();
  let prevMonth = date.setMonth(month - 1);
  let formatPrevMonth = new Date(date.setMonth(month - 1));
  let lastmonthe = formatDate(formatPrevMonth);
  Vehicle.find({
    $and: [
      {
        updatedAt: {
          $gte: new Date(lastmonthe),
          $lte: new Date(today),
        },
      },
      {
        Bid: { $exists: true, $not: { $size: 0 } },
      },
    ],
  })
    .then((Vehicles) => {
      res.status(200).json({ Vehicles });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
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

//update user profile
router.put("/bid/:id", async (req, res) => {
  let date = new Date();
  console.log(date);
  const vehicleid = req.params.id;
  const id = objId(req.body.uid);
  try {
    const user = await User.findById(id);
    const newVehicle = await Vehicle.findOneAndUpdate(
      { _id: vehicleid },
      {
        $push: {
          Bid: { uid: req.body.uid, value: req.body.value, bidDate: date },
        },
      }
    );
    res.status(200).send({ message: "Bid Sucessfully Added" });
  } catch (err) {
    console.log(err.message);
  }
});

//GET ALL
router.get("/all", async (req, res) => {
  try {
    const vehicle = await Vehicle.find({}).populate("Bid.uid");

    res.status(200).json({ vehicle });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

//TablePagination
router.get("/sale", async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    console.log(page);
    const count = await Vehicle.find({}).count();
    const vehicle = await Vehicle.find({})
      // .populate("Bid.uid")
      .limit(limit)
      .skip(page * limit);
    console.log(count);
    res.status(200).json({ count, vehicle });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

//TablePagination
router.get("/sale/:search", async (req, res) => {
  try {
    const search = req.params.search;
    const { page = 1, limit = 12 } = req.query;
    console.log(page);
    const count = await Vehicle.find({ Brand: search }).count();
    const vehicle = await Vehicle.find({ Brand: search })
      // .populate("Bid.uid")
      .limit(limit)
      .skip(page * limit);
    console.log(count);
    res.status(200).json({ count, vehicle });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  Vehicle.findByIdAndDelete(req.params.id)
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
