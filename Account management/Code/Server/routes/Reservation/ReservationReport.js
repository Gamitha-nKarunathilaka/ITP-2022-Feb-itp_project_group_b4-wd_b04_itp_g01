const router = require("express").Router();
const Reservation = require("../../models/Reservation/Reservation");
const Report = require("../../models/Reservation/Report");
//add new warrenty

router.post("/addreservation", async (req, res) => {
  const today = formatDate(new Date());
  try {
    //add new bill
    const newReservation = new Report({
      reportID: req.body.reportID,
      reportDate: today,
      reportData: req.body.reportData,
      time: req.body.time,
      Totalpending: req.body.Totalpending,
      Totalreject: req.body.Totalreject,
      Totalapprove: req.body.Totalapprove,
      Totalcomplete: req.body.Totalcomplete,
    });

    //save
    const savedReservation = await newReservation.save();

    console.log(savedReservation);

    res.status(200).json(savedReservation);
  } catch (e) {
    return res.status(501).json(e.message);
  }
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
