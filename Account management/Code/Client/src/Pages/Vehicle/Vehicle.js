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
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Skeleton } from '@mui/material';
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import PopUp from "../../component/PopUp/PopUp";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import Notification from "../../component/Notification/Notification";
import ConfirmDialog from "../../component/ConfirmDialog/ConfirmDialog";
import Pdftemplate from "../../component/Pdftemplate/Pdftemplate";
import PageviewIcon from "@mui/icons-material/Pageview";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "react-query";
import InjectorForm from "../../component/Form/InjectorForm";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
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
    [theme.breakpoints.down('md')]: {
      padding: "50px 5px",
    },
  },
  newButton: {
    left: "50px",
  },
  btn: {
    [theme.breakpoints.down('sm')]: {
      width: "50%",
    },
    width: "70%",
  },

  secondary: {
    backgroundColor: theme.palette.secondary.light,
    "& .MuiSvgIcon-root": {
      color: theme.palette.background.paper,
    },
    margin: theme.spacing(0.5),
  },
  primary: {
    backgroundColor: theme.palette.error.light,
    "& .MuiSvgIcon-root": {
      color: theme.palette.background.paper,
    },
  },
  pdf: {
    marginBottom: "0px",
  },
}));

const Vehicle = () => {
  const navigate = useNavigate();
  const classes = userStyle();
  const example = {
    customerName: "error",
  };
  const [InjectorData, setInjectorData] = useState([]);
  const [Loading, setLoading] = useState(false);

  //pageNation and sorting
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Brand");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  const [searchFilter, setSearchFilter] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopUp] = useState(false);
  const tableHeader = [
    { id: "VehicleNo", Header: "Vehicle No", diableSorting: true },
    { id: "Price", Header: "Price", diableSorting: true },
    { id: "Brand", Header: "Brand", diableSorting: true },
    {
      id: "YearofManufacture",
      Header: "Year of Manufacture",
      diableSorting: true,
    },
    { id: "Mileage", Header: "Mileage", diableSorting: true },
    { id: "Actions", Header: "Actions", diableSorting: true },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSearch = (e) => {
    let target = e.target.value.toLowerCase();

    setSearchFilter({
      fn: (items) => {
        if (target == "") return items;
        else
          return items.filter(
            (x) =>
              x.VehicleNo.toLowerCase().includes(target) ||
              x.Model.toLowerCase().includes(target)
          );
      },
    });
  };

  //handle all the sorting and  searching then return data
  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      searchFilter.fn(InjectorData),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };
  function getData() {
    setLoading(true);
    publicRequest
      .get("Vehicle/all")
      .then((post) => {
        console.log(post);
        setInjectorData(post.data);
        setLoading(false);
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: `Error Occurd ${error}`,
          type: "error",
        });
        setInjectorData([]);
      });
  }

  const addOrEdit = (values) => {
    if (values._id === 0) {
    } else {
    }
  };
  const updatepopUp = (e, item) => {
    console.log(item);
    setRecordForEdit(item);
    setOpenPopUp(true);
  };

  const handleDelete = (id) => {
    publicRequest
      .delete(`Vehicle/deletes/${id}`)
      .then((post) => {
        console.log(post.data.warrenties);

        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });

        setNotify({
          isOpen: true,
          message: "Successfully Deleted",
          type: "success",
        });
      })
      .catch((error) => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        setNotify({
          isOpen: true,
          message: "Error Occurd",
          type: "error",
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="xl" className={classes.main}>
        <CssBaseline />
        <div className={classes.paper}>
          <Paper className={classes.paper}>
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              align="left"
            >
              Injector Details
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Toolbar>
              <TextField
                size="small"
                className={classes.btn}
                color="secondary"
                label="Search field"
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="outlined"
                color="secondary"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => navigate("form")}
              >
                Add Item
              </Button>
            </Toolbar>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {tableHeader.map((value) => {
                      return (
                        <TableCell
                          key={value.id}
                          sortDirection={orderBy === value.id ? order : false}
                        >
                          {value.diableSorting ? (
                            value.Header
                          ) : (
                            <TableSortLabel
                              active={orderBy === value.id}
                              direction={orderBy === value.id ? order : "asc"}
                              onClick={() => handleSortRequest(value.id)}
                            >
                              {value.Header}
                            </TableSortLabel>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item) => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell> {item.VehicleNo}</TableCell>
                        <TableCell>Rs {item.Price}M</TableCell>
                        <TableCell> {item.Model}</TableCell>
                        <TableCell> {item.Mileage}</TableCell>
                        <TableCell> {item.YearofManufacture}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            aria-label="edit"
                            className={classes.secondary}
                            // onClick={(e) => updatepopUp(e, item)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            className={classes.primary}
                            aria-label="delete"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this record?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => handleDelete(item._id),
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {Loading &&
                    [1, 2, 3, 4].map((item) => {
                      return (
                        <TableRow key={item}>
                          <TableCell>
                            {" "}
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Skeleton animation="wave" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              page={page}
              rowsPerPageOptions={pages}
              rowsPerPage={rowsPerPage}
              count={InjectorData.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangePerPage}
            />
          </Paper>
          <PopUp
            title="Update Injector"
            openPopup={openPopup}
            setOpenPopUp={setOpenPopUp}
          >
            <InjectorForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
          </PopUp>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </div>
      </Container>
    </div>
  );
};

export default Vehicle;
