const router = require("express").Router();
const Reservation = require("../../models/Reservation/Reservation");

//add new warrenty

router.post("/addreservation", async (req, res) => {
  try {
    //add new bill
    const newReservation = new Reservation({
      ReservationID: req.body.ReservationID,
      title: req.body.title,
      name: req.body.fname + req.body.lname,
      mobileNo: req.body.mobileNo,
      serviceType: req.body.serviceType,
      date: req.body.date,
      Time: req.body.Time,
      vehicleRegistationNo: req.body.vehicleRegistationNo,
      mileage: req.body.mileage,
      mileageUnit: req.body.mileageUnit,
      comment: req.body.comment,
      status: req.body.status,
    });

    //save
    const savedReservation = await newReservation.save();

    console.log(savedReservation);

    res.status(200).json(savedReservation);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/reservationreport", async (req, res) => {
  let date = new Date();
  let today = formatDate(date);
  let month = new Date().getMonth();
  let prevMonth = date.setMonth(month - 1);
  let formatPrevMonth = new Date(date.setMonth(month - 1));

  let lastmonthe = formatDate(formatPrevMonth);
  Reservation.find({
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
    .then((Reservations) => {
      res.status(200).json({ Reservations });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/getAll", async (req, res) => {
  Reservation.find({})
    .then((Reservations) => {
      res.status(200).json({ Reservations });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  Reservation.findById(req.params.id)
    .then((Reservations) => {
      res.status(200).json({ Reservations });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Reservation.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Reservations) => {
      res.status(200).json({ Reservations });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then((Reservations) => {
      res.status(200).json({ Reservations });
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
