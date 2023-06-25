import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import Dashbord from "../Pages/DashBord";
import DashBordDarwer from "../component/Drawer/DrawerDashbord";
import Warrenty from "../Pages/Warranty/Warranty";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register.js";
import { useSelector } from "react-redux";
import WarrentyForm from "../Pages/Warranty/WarrantyForm";
import DateFnsUtils from "@date-io/date-fns";
import Injectors from "../Pages/SparePart/Injector";
import NotFound from "../Pages/NotFound";
import Pdf from "../Pages/Warranty/Pdf";
import Bill from "../Pages/Finance/Bill";
import EmployeeForm from "../Pages/Employee/EmployeeForm";
import Employee from "../Pages/Employee/Employee";
import Maintain from "../Pages/Maintaince/Maintaince";
import Home from "../Pages/Home/Home";
import Feedback from "../Pages/FeedBack/FeedBack";
import Vehicle from "../Pages/Vehicle/AdminVehcle";
import SparePart from "../Pages/SparePart/SpareParts";
import Reservation from "../Pages/Reservations/Reservation";
import ReservationForm from "../Pages/Reservations/ReservationForm";
import Sale from "../Pages/Vehicle/Sale";
import Store from "../Pages/SparePart/Store";
import VehicleDetails from "../Pages/Vehicle/VehicleDetails";
import Claim from "../Pages/Warranty/Claims";
import Profile from "../Pages/Profile/UserProfile";
import ClientReserv from "../Pages/Reservations/ClientReserv";
import AdminVehcle from "../Pages/Vehicle/AdminVehcle";
import AddBill from "../Pages/Finance/AddBill";
import WarrantyReport from "../Pages/Warranty/Reports";
import ReportProtoType from "../component/Report/ReportProtoType";
import ReportFeedBack from "../component/Report/ReportFeedBack";
import Attendence from "../Pages/Employee/xlsx/EmployeeAteendance";
import EmployeSalary from "../component/Report/EmployeSalary";
import SalaryReport from "../Pages/Finance/SalaryReport";
import VehicleReport from "../component/Report/VehicleReport";
import VehicalReportTable from "../Pages/Vehicle/Report";
import FeedbackReport from "../Pages/FeedBack/Report";
import EmployeeReport from "../component/Report/EmployeeReport";
import MaintainReport from "../component/Report/maintainReport";
import ReservationReport from "../component/Report/reservationReport";
import Sparepartreport from "../component/Report/sparepartReport";
import FinanceReport from "../component/Report/FinanceReport";
const queryClient = new QueryClient();
const theme = createTheme({
  overrides: {
    MuiInputBase: {
      styleOverride: {
        input: {
          padding: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: "Koulen",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontSize: "14",
  },
});
function App() {
  const { curruntUser } = useSelector((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Routes>
              <Route
                path="/login"
                element={curruntUser ? <Navigate to="/" /> : <Login />}
              />
              <Route path="/login/register" element={<Register />} />
              <Route path="/register" element={<Register />} />

              <Route path="/reservations" element={<ClientReserv />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/store" element={<Store />} />

              <Route path="/element" element={<VehicleDetails />} />
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<DashBordDarwer />}>
                  <Route path="/dashbord" element={<Dashbord />} />
                  <Route path="/warrenty" element={<Warrenty />} />
                  <Route path="/warrenty/form" element={<WarrentyForm />} />
                  <Route path="/warrenty/form/pdf" element={<Pdf />} />
                  <Route path="/warrentyReport" element={<WarrantyReport />} />
                  <Route
                    path="/warrentyReport/report"
                    element={<ReportProtoType />}
                  />
                  <Route path="/injectors" element={<Injectors />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/employee/form" element={<EmployeeForm />} />
                  <Route path="/employeereport" element={<EmployeeReport />} />

                  <Route
                    path="/salaryreport/salary"
                    element={<EmployeSalary />}
                  />
                  <Route path="/salaryreport" element={<SalaryReport />} />

                  <Route path="/attendence" element={<Attendence />} />

                  <Route path="/vehicle" element={<Vehicle />} />
                  <Route
                    path="/vehicleReport"
                    element={<VehicalReportTable />}
                  />

                  <Route
                    path="/vehicleReport/report"
                    element={<VehicleReport />}
                  />

                  <Route path="/reservation" element={<Reservation />} />
                  <Route
                    path="/reservation/form"
                    element={<ReservationForm />}
                  />
                  <Route
                    path="/reservationreport"
                    element={<ReservationReport />}
                  />

                  <Route path="/bill" element={<Bill />} />
                  <Route path="/bill/add" element={<AddBill />} />
                  <Route path="/financeReport" element={<FinanceReport />} />

                  <Route path="/maintaince" element={<Maintain />} />
                  <Route
                    path="/maintaincereport"
                    element={<MaintainReport />}
                  />

                  <Route path="/spareparts" element={<SparePart />} />
                  <Route
                    path="/sparepartreport"
                    element={<Sparepartreport />}
                  />

                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/feedbackReport" element={<FeedbackReport />} />
                  <Route
                    path="/feedbackReport/report"
                    element={<ReportFeedBack />}
                  />
                  <Route path="/claim" element={<Claim />} />
                  <Route path="/AdminVehcle" element={<AdminVehcle />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

export default App;
