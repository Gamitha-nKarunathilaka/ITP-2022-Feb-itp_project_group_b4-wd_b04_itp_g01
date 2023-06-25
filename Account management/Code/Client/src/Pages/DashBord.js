import {
  Button as btn,
  Container,
  Typography,
  Paper,
  CssBaseline,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
  Grid,
  TableSortLabel,
  Toolbar,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { purple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Autocomplete, Skeleton } from "@mui/material";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
// import PopUp from "../component/PopUp";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
// import EngineForm from "./FormPage/EngineForm";
// import Notification from "../component/Notification/Notification";
// import ConfirmDialog from "../component/ConfirmDialog/ConfirmDialog";

const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
    marginTop: "20px",
    backgroundColor: theme.palette.background.paper,
  },

  paper: {
    [theme.breakpoints.up("sm")]: {
      padding: "40px",
    },
    marginTop: "20px",
    height: "auto",
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.text,
    },
    "& tbody td": {
      fontWeight: "400",
    },
    "& tbody tr:hover":
      theme.palette.mode === "dark"
        ? {
            backgroundColor: theme.palette.grey.A400,
            cursor: "pointer",
          }
        : {
            backgroundColor: theme.palette.grey[300],
            cursor: "pointer",
          },
  },
  main: {
    [theme.breakpoints.down("md")]: {
      padding: "50px 5px",
    },
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    width: "70%",
  },

  secondary: {
    backgroundColor: theme.palette.info.dark,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
    margin: theme.spacing(0.5),
  },
  editIcon: {
    "&.MuiSvgIcon-root": {
      color: "#fff",
    },
  },
  deleteIcon: {
    "&.MuiSvgIcon-root": {
      color: "#fff",
    },
  },
  primary: {
    backgroundColor: theme.palette.error.light,
    "& .MuiButton-label": {
      color: theme.palette.primary.light,
    },
  },
}));

const Dashbord = () => {
  //   const navigate = useNavigate();
  const classes = userStyle();
  //   const toast = useToast();
  //   const [EngineData, setEngineData] = useState([]);
  //   const [Loading, setLoading] = useState(false);

  //   //pageNation and sorting
  //   const pages = [5, 10, 25];
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  //   const [order, setOrder] = useState("asc");
  //   const [orderBy, setOrderBy] = useState("Brand");
  //   const colRef = collection(db, "Engine");
  //   const [notify, setNotify] = useState({
  //     isOpen: false,
  //     message: "",
  //     type: "",
  //   });
  //   const [confirmDialog, setConfirmDialog] = useState({
  //     isOpen: false,
  //     title: "",
  //     subtitle: "",
  //   });
  //   const [searchFilter, setSearchFilter] = useState({
  //     fn: (items) => {
  //       return items;
  //     },
  //   });

  //   const [recordForEdit, setRecordForEdit] = useState(null);
  //   const [openPopup, setOpenPopUp] = useState(false);
  //   const tableHeader = [
  //     { id: "Brand", Header: "Brand1" },
  //     { id: "id", Header: "Brand2" },
  //     { id: "Code", Header: "Brand3" },
  //     { id: "action", Header: "Actions", diableSorting: true },
  //   ];

  //   const handlePageChange = (event, newPage) => {
  //     setPage(newPage);
  //   };
  //   const handleChangePerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };

  //   function descendingComparator(a, b, orderBy) {
  //     if (b[orderBy] < a[orderBy]) {
  //       return -1;
  //     }
  //     if (b[orderBy] > a[orderBy]) {
  //       return 1;
  //     }
  //     return 0;
  //   }
  //   function getComparator(order, orderBy) {
  //     return order === "desc"
  //       ? (a, b) => descendingComparator(a, b, orderBy)
  //       : (a, b) => -descendingComparator(a, b, orderBy);
  //   }

  //   function stableSort(array, comparator) {
  //     const stabilizedThis = array.map((el, index) => [el, index]);
  //     stabilizedThis.sort((a, b) => {
  //       const order = comparator(a[0], b[0]);
  //       if (order !== 0) return order;
  //       return a[1] - b[1];
  //     });
  //     return stabilizedThis.map((el) => el[0]);
  //   }

  //   const handleSearch = (e) => {
  //     let target = e.target.value.toLowerCase();
  //     setSearchFilter({
  //       fn: (items) => {
  //         if (target == "") return items;
  //         else return items.filter((x) => x.Brand.toLowerCase().includes(target));
  //       },
  //     });
  //   };

  //   const recordsAfterPagingAndSorting = () => {
  //     return stableSort(
  //       searchFilter.fn(EngineData),
  //       getComparator(order, orderBy)
  //     ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  //   };

  //   const handleSortRequest = (cellId) => {
  //     const isAsc = orderBy === cellId && order === "asc";
  //     setOrder(isAsc ? "desc" : "asc");
  //     setOrderBy(cellId);
  //   };
  //   function getData() {
  //     const ref = collection(db, "Engine");
  //     setLoading(true);
  //     onSnapshot(ref, (snapshot) => {
  //       let post = [];
  //       snapshot.docs.map((doc) => {
  //         post.push({
  //           id: doc.id,
  //           ...doc.data(),
  //         });
  //       });
  //       setEngineData(post);
  //       setLoading(false);
  //     });
  //   }

  //   //handle update popup
  //   const addOrEdit = (values) => {
  //     if (values.id === 0) {
  //       addDoc(colRef, {
  //         Brand: values.Brand,
  //         Code: values.Code,
  //       })
  //         .then(() => {
  //           toast({
  //             description: "Product Successfully Added",
  //             status: "success",
  //             duration: 5000,
  //             isClosable: true,
  //           });
  //           setOpenPopUp(false);
  //         })
  //         .catch((e) => {
  //           toast({
  //             description: "Error Occur",
  //             status: "error",
  //             duration: 5000,
  //             isClosable: true,
  //           });
  //         });
  //     } else {
  //       const docRef = doc(db, "Engine", values.id);
  //       updateDoc(docRef, {
  //         Brand: values.Brand,
  //         Code: values.Code,
  //       })
  //         .then(() => {
  //           toast({
  //             description: "Details Successfully Updated",
  //             status: "success",
  //             duration: 5000,
  //             isClosable: true,
  //           });
  //           setOpenPopUp(false);
  //           setRecordForEdit(null);
  //         })
  //         .catch(() => {
  //           toast({
  //             description: "Error Occur",
  //             status: "error",
  //             duration: 5000,
  //             isClosable: true,
  //           });
  //         });
  //     }
  //   };

  //   const updatepopUp = (e, item) => {
  //     setRecordForEdit(item);
  //     setOpenPopUp(true);
  //   };

  //   const handleDelete = (id) => {
  //     const docRef = doc(db, "Engine", id);
  //     setConfirmDialog({
  //       ...confirmDialog,
  //       isOpen: false,
  //     });
  //     deleteDoc(docRef)
  //       .then(() => {
  //         setNotify({
  //           isOpen: true,
  //           message: "Successfully Deleted",
  //           type: "success",
  //         });
  //       })
  //       .catch((e) => {
  //         setNotify({
  //           isOpen: true,
  //           message: "Error Occurd",
  //           type: "error",
  //         });
  //       });
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);

  return (
    <div className={classes.roots} id="review">
      <Container maxWidth="lg">
        <iframe
          style={{
            background: "#FFFFFF",
            border: " none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "100%",
            height: "350px",
          }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-ecodo/embed/charts?id=627dbb01-5476-4885-84be-a9e18428407b&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
      </Container>
    </div>
  );
};

export default Dashbord;
