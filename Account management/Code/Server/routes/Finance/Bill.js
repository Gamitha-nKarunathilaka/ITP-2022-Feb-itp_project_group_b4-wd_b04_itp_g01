const router = require("express").Router();
const Bill = require("../../models/Finance/Bill");

//add new warrenty
router.post("/add", async (req, res) => {
  try {
    //add new bill
    const newWarrenty = new Bill({
      Billl_ID: req.body.Billl_ID,
      Total: req.body.Total,
      date: req.body.date,
      ItemCount: req.body.ItemCount,
      discount: req.body.discount,
      Item_Used: req.body.Item_Used,
    });

    //save
    const savedWarrenty = await newWarrenty.save();

    res.status(200).json(savedWarrenty);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.get("/getAll", async (req, res) => {
  Bill.find({})
    .populate("Item_Used.id")
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.get("/:id", async (req, res) => {
  Bill.findById(req.params.id)
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.put("/update/:id", async (req, res) => {
  Bill.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

router.delete("/delete/:id", async (req, res) => {
  Bill.findByIdAndDelete(req.params.id)
    .then((Bills) => {
      res.status(200).json({ Bills });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

module.exports = router;
