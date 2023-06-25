const router = require("express").Router();
const FeedBack = require("../../models/FeedBack/FeedBack");

//add new warrenty
router.post("/add", async (req, res) => {
  try {
    //add new bill
    const newWarrenty = new FeedBack({
      Feedback_ID: req.body.Feedback_ID,
      Feedback_Date: req.body.Feedback_Date,
      FeedbackMsg: req.body.FeedbackMsg,
      Rate: req.body.Rate,
      Uid: req.body.Uid,
    });

    //save
    const savedWarrenty = await newWarrenty.save();

    res.status(200).json(savedWarrenty);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  FeedBack.find({})
    .then((FeedBacks) => {
      res.status(200).json({ FeedBacks });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/feedbackreport", async (req, res) => {
  let date = new Date();
  let today = formatDate(date);
  let month = new Date().getMonth();
  let prevMonth = date.setMonth(month - 1);
  let formatPrevMonth = new Date(date.setMonth(month - 1));

  let lastmonthe = formatDate(formatPrevMonth);
  FeedBack.find({
    createdAt: {
      $gte: new Date(lastmonthe),
      $lte: new Date(today),
    },
  })
    .then((feedBacks) => {
      res.status(200).json({ feedBacks });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  FeedBack.findById(req.params.id)
    .then((FeedBacks) => {
      res.status(200).json({ FeedBacks });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  FeedBack.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((FeedBacks) => {
      res.status(200).json({ FeedBacks });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  FeedBack.findByIdAndDelete(req.params.id)
    .then((FeedBacks) => {
      res.status(200).json({ FeedBacks });
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
