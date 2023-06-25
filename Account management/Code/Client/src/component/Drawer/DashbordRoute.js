import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import BuildIcon from "@mui/icons-material/Build";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import StoreIcon from "@mui/icons-material/Store";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
export const WarrantyRoutes = [
  {
    label: "Warranty",
    path: "/Warrenty",
    icon: <ReceiptOutlinedIcon />,
    activeIcon: <ReceiptIcon />,
    component: "Warrenty",
  },
  {
    label: "Claims",
    path: "/claim",
    icon: <AddBoxOutlinedIcon />,
    activeIcon: <AddBoxIcon />,
    component: "Claims",
  },
  {
    label: "Reports",
    path: "/warrentyReport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];

export const SparepartRoutes = [
  {
    label: "Spare Parts",
    path: "/spareparts",
    icon: <StoreOutlinedIcon />,
    activeIcon: <StoreIcon />,
    component: "Spare Parts",
  },
  {
    label: "Injectors",
    path: "/injectors",
    icon: <AddBoxOutlinedIcon />,
    activeIcon: <AddBoxIcon />,
    component: "Injectors",
  },
  {
    label: "Reports",
    path: "/sparepartreport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];

export const VehicleRoutes = [
  {
    label: "Vehicle",
    path: "/vehicle",
    icon: <DriveEtaOutlinedIcon />,
    activeIcon: <DriveEtaIcon />,
    component: "vehicle",
  },
  {
    label: "Reports",
    path: "/vehicleReport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];

export const ReservationRoutes = [
  {
    label: "Reservation",
    path: "/reservation",
    icon: <InboxOutlinedIcon />,
    activeIcon: <InboxIcon />,
    component: "reservation",
  },
  {
    label: "Reports",
    path: "/reservationreport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];

export const FeedBackRoutes = [
  {
    label: "Feedback",
    path: "/feedback",
    icon: <ForumOutlinedIcon />,
    activeIcon: <ForumIcon />,
    component: "feedback",
  },
  {
    label: "Reports",
    path: "/feedbackReport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];

export const EmployeeRoutes = [
  {
    label: "Employee",
    path: "/employee",
    icon: <PersonOutlineIcon />,
    activeIcon: <PersonIcon />,
    component: "employee",
  },
  {
    label: "Attendance ",
    path: "/attendence",
    icon: <EmojiPeopleOutlinedIcon />,
    activeIcon: <EmojiPeopleIcon />,
    component: "Attendance",
  },
  {
    label: "Reports",
    path: "/employeereport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];

export const FinanceRoutes = [
  {
    label: "Bill",
    path: "/bill",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <InsertChartIcon />,
    component: "finance",
  },
  {
    label: "Salary",
    path: "/salaryreport",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <InsertChartIcon />,
    component: "finance",
  },

  {
    label: "Reports",
    path: "/financeReport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];

export const MaintainRoutes = [
  {
    label: "Maintaince",
    path: "/maintaince",
    icon: <BuildOutlinedIcon />,
    activeIcon: <BuildIcon />,
    component: "maintaince",
  },
  {
    label: "Reports",
    path: "/maintaincereport",
    icon: <SettingsOutlinedIcon />,
    activeIcon: <SettingsIcon />,
    component: "Reports",
  },
];
