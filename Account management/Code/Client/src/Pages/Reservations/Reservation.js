import { Button as btn, Container, Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Genrator from "../../component/IdGenrarator/RandomID";
import Notification from "../../component/Notification/Notification";

import { publicRequest } from "../../axiosRequest/defaultAxios";

import { useMutation, useQuery, useQueryClient } from "react-query";
import MaterialTable from "@material-table/core";

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
    [theme.breakpoints.down("md")]: {
      padding: "50px 5px",
    },
  },
  newButton: {
    left: "50px",
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
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
const statuses = {
  Pending: "Pending",
  Complete: "Complete",
  Approved: "Approved",
  Rejected: "Rejected",
};
//fetch data
async function fetchEmployee() {
  const res = await publicRequest.get(`Reservation/getAll`);
  return res;
}

const Reservation = () => {
  const navigate = useNavigate();
  const classes = userStyle();
  const queryClient = useQueryClient();
  const [resultData, setResultData] = useState([]);
  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Reservation"],
    () => fetchEmployee()
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [columns, setColumns] = useState([
    {
      field: "ReservationID",
      title: "Reservation ID",
      editable: false,
      sorting: false,
    },
    {
      field: "title",
      title: "Title",
      editable: false,
      searchable: false,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      field: "name",
      title: "Name",
      editable: false,
      searchable: false,
      sorting: false,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "mobileNo",
      title: "Mobile No",
      searchable: false,
      sorting: false,
      editable: false,
    },
    {
      field: "serviceType",
      title: "Service Type",
      searchable: false,
      sorting: false,
      editable: false,
    },
    {
      field: "date",
      title: "Date&Time",
      searchable: false,
      editable: false,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "Time",
      title: "Time",
      searchable: false,
      editable: false,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "vehicleRegistationNo",
      title: "Vehicle Registation No",
      sorting: false,
      editable: false,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "mileage",
      title: "Mileage",
      sorting: false,
      searchable: false,
      editable: false,
    },
    {
      field: "comment",
      title: "Comment",
      searchable: false,
      sorting: false,
      editable: false,

      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "status",
      title: "Status",
      searchable: false,
      sorting: false,
      lookup: statuses,
    },
  ]);

  //Api Calls

  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`Reservation/delete/${id}`);
  };

  //update
  const updateClaims = (newData) => {
    const id = newData._id;
    return publicRequest.put(`Reservation/update/${id}`, newData);
  };

  //useMutation

  //delete
  const deleteReq = useMutation(deleteClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully Deleted",
        type: "success",
      });

      queryClient.invalidateQueries("Reservation");
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
    },
  });

  //update
  const updateReq = useMutation(updateClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully Deleted",
        type: "success",
      });

      queryClient.invalidateQueries("Reservation");
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const payload = data.data.Reservations;
      console.log(payload);
      setResultData(payload);
    }

    if (isError) {
      setNotify({
        isOpen: true,
        message: `Error Occurd ${error}`,
        type: "error",
      });
    }

    //
  }, [data, error]);

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="xl" className={classes.main}>
        <Paper className={classes.table}>
          <MaterialTable
            title="Reservation Details"
            isLoading={isLoading}
            columns={columns}
            data={resultData}
            options={{
              actionsColumnIndex: 0,
              addRowPosition: "first",
              doubleHorizontalScroll: true,
            }}
            localization={{ toolbar: { searchPlaceholder: "ID/RegNo" } }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  const id = oldData._id;
                  console.log(id);
                  console.log(newData);
                  console.log(oldData);
                  updateReq.mutate({ ...newData });
                  resolve();
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  const id = oldData._id;
                  console.log(id);
                  console.log(oldData);
                  deleteReq.mutate(id);
                  resolve();
                }),
            }}
          />

          <Notification notify={notify} setNotify={setNotify} />
        </Paper>
      </Container>
    </div>
  );
};

export default Reservation;
