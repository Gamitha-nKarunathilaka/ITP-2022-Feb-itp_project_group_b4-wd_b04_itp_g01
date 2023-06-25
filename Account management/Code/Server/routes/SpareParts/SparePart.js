const router = require("express").Router();
const mongoose = require("mongoose");
const SparePart = require("../../models/SparePart/spareParts");
const User = require("../../models/User/user");
const objId = mongoose.Types.ObjectId;

router.get("/usertest", (req, res) => {
  res.send("user data recived");
});

router.post("/add", async (req, res) => {
  try {
    const newSparePart = await SparePart.create({
      SparepartID: req.body.SparepartID,
      ItemName: req.body.ItemName,
      ItemDiscription: req.body.ItemDiscription,
      Available: req.body.Available,
      Used: req.body.Used,
      UnitSellingPrice: req.body.UnitSellingPrice,
      UnitBuyingPrice: req.body.UnitBuyingPrice,
    });
    await newSparePart.save();
    res.status(200).send({ message: "Sucessfully new SparePartsadded" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/sparepartreport", async (req, res) => {
  let date = new Date();
  let today = formatDate(date);
  let month = new Date().getMonth();
  let prevMonth = date.setMonth(month - 1);
  let formatPrevMonth = new Date(date.setMonth(month - 1));

  let lastmonthe = formatDate(formatPrevMonth);
  SparePart.find({
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
    .then((SpareParts) => {
      res.status(200).json({ SpareParts });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
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

//update user profile
router.put("/bid/:id", async (req, res) => {
  const vehicleid = req.params.id;
  const id = objId(req.body.uid);
  try {
    const user = await User.findById(id);
    const SpareParts = await SparePart.findOneAndUpdate(
      { _id: vehicleid },
      { $push: { Bid: { uid: req.body.uid, value: req.body.value } } }
    );
    res.status(200).send({ message: "Bid Sucessfully Added" });
  } catch (err) {
    console.log(err.message);
  }
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
  SparePart.findByIdAndDelete(req.params.id)
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
  console.log([year, month, day].join("-"));
  return [year, month, day].join("-");
}
module.exports = router;
