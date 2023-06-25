// import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//cors oprions
const corsOptions = {
  origin: "http://localhost:3000",
  method: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

//custome routes
const warrentyRoute = require("./routes/Warrenty/warrenty");
const userRoute = require("./routes/User/user");
const authRoute = require("./routes/Auth/auth");
const injectorRoute = require("./routes/SpareParts/Injector");
const VehicleRoute = require("./routes/Vehicle/Vehicle");
const ReservationRoute = require("./routes/Reservation/Reservation");
const MaintainRoute = require("./routes/Maintain/Maintain");
const BillsRoute = require("./routes/Finance/Bill.js");
const EmployeeRoute = require("./routes/Employee/Employee");
const FeedBackRoute = require("./routes/FeedBack/FeedBack");
const SparePartRoute = require("./routes/SpareParts/SparePart");
const ClaimsRoute = require("./routes/Warrenty/claims");
const WarrantyReportRoute = require("./routes/Warrenty/Report");
const AttendenceRoute = require("./routes/Employee/Attendence");
const FinanceReportRoute = require("./routes/Finance/Report");
const VehicalReportRoute = require("./routes/Vehicle/VehicleReport");
const MaintainReportRoute = require("./routes/Maintain/MaintainReport");
const SparePartReportRoute = require("./routes/SpareParts/SparePartReport");
//database connetion
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Databse connection Sucessfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// //middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/warrenty", warrentyRoute);
app.use("/api/claims", ClaimsRoute);
app.use("/api/Vehicle", VehicleRoute);
app.use("/api/Reservation", ReservationRoute);
app.use("/api/Maintain", MaintainRoute);
app.use("/api/Bill", BillsRoute);
app.use("/api/SparePart", SparePartRoute);
app.use("/api/Employee", EmployeeRoute);
app.use("/api/FeedBack", FeedBackRoute);
app.use("/api/Injector", injectorRoute);
app.use("/api/warrantyReport", WarrantyReportRoute);
app.use("/api/Attendence", AttendenceRoute);
app.use("/api/FinanceReport", FinanceReportRoute);
app.use("/api/VehicalReport", VehicalReportRoute);
app.use("/api/MaintainReport", MaintainReportRoute);
app.use("/api/SparePartReport", SparePartReportRoute);

//app running port
app.listen(process.env.PORT || 5000, () => {
  console.log("BackEnd server online");
});
