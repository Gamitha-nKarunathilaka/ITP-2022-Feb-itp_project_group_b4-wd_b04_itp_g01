import { Button as btn, Container, Paper, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Genrator from "../../component/IdGenrarator/RandomID";
import Notification from "../../component/Notification/Notification";

import { publicRequest } from "../../axiosRequest/defaultAxios";
import {
  colorchange,
  dateFormatter,
} from "../../component/IdGenrarator/ColorChanger";
import { useMutation, useQuery, useQueryClient } from "react-query";
import MaterialTable from "@material-table/core";
import { DatePicker } from "@mui/lab";
//used to maintain a constant
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

//fetch data
async function fetchmaintaince() {
  const res = await publicRequest.get(`Maintain/getAll`);
  return res;
}
//used to maintain a constant
const Maintaince = () => {
  const navigate = useNavigate();
  const classes = userStyle();
  const queryClient = useQueryClient();
  const [resultData, setResultData] = useState([]);
  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Maintain"],
    () => fetchmaintaince()
  );
  //used to maintain a constant
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleDateChange = (dates) => {
    console.log(dates);
    // const after = new Date(dates);
    // console.log(after);
    // return after;
  };
  const clais = {};
  function formatDate(thedate) {
    return (
      thedate.getFullYear() +
      "/" +
      (thedate.getMonth() + 1) +
      "/" +
      thedate.getDate()
    );
  }
  //getNameFrom
  const getName = async () => {
    const res = await publicRequest.get("employee/getnames");
    const gotName = res.data.Employees;
    var i = 0;
    const objects = {};
    gotName.map((item) => {
      let id = item._id;
      clais[`${id}`] = item.employeeName;
    });
    // console.log(clais);
  };

  const statuses = {
    Pending: "Pending",
    Complete: "Complete",
  };
  const jobroles = {
    Technicians: "Technicians",
    Admin: "Admin",
    "Quality Checker": "Quality Checker",
  };
  const [columns, setColumns] = useState([
    {
      field: "MaintainID",
      title: "Maintain ID",
      editable: false,
      sorting: false,
    },
    {
      field: "date",
      title: "Date",
      editable: "onAdd",
      editComponent: (props) => (
        <DatePicker
          label="Date"
          renderInput={(params) => (
            <TextField
              fullWidth
              margin="normal"
              {...params}
              variant="standard"
            />
          )}
          value={props.value}
          onChange={(e) => props.onChange(e)}
        />
      ),
      render: (rowData) => {
        return dateFormatter(rowData.date);
      },
    },
    {
      field: "Cost",
      title: "SpareParts Cost",
      sorting: false,
      searchable: false,
      type: "currency",
      currencySetting: { currencyCode: "LKR" },
      validate: (rowData) => {
        if (rowData.Cost === undefined || rowData.Cost === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "Servicecharge",
      title: "Service charge",
      sorting: false,
      type: "currency",
      currencySetting: { currencyCode: "LKR" },
      searchable: false,
      validate: (rowData) => {
        if (
          rowData.Servicecharge === undefined ||
          rowData.Servicecharge === ""
        ) {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "TechnicianName",
      title: "Technician Name",
      lookup: clais,
      sorting: false,
      searchable: false,
      validate: (rowData) => {
        if (
          rowData.TechnicianName === undefined ||
          rowData.TechnicianName === ""
        ) {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "workDIscription",
      title: "Work DIscription",
      searchable: false,
      sorting: false,
      validate: (rowData) => {
        if (
          rowData.workDIscription === undefined ||
          rowData.workDIscription === ""
        ) {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "Status",
      title: "Status",
      sorting: false,
      lookup: statuses,
      editable: "onUpdate",
    },
  ]);

  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Maintain/add", claim);
  };

  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`Maintain/delete/${id}`);
  };

  // update data
  const updateClaims = (newData) => {
    const id = newData._id;
    return publicRequest.put(`Maintain/update/${id}`, newData);
  };

  //useMutation
  //insert
  const add = useMutation(addClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully added",
        type: "success",
      });

      queryClient.invalidateQueries("Maintain");
    },
    onError: (error) => {
      console.log(error.response);

      const message = error.response.data.error;
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${message}`,
        type: "error",
      });
    },
  });

  //delete
  const deleteReq = useMutation(deleteClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully Deleted",
        type: "success",
      });

      queryClient.invalidateQueries("Maintain");
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

      queryClient.invalidateQueries("Maintain");
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
      const payload = data.data.Maintains;
      console.log(payload);
      getName();
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
            title="maintaince Details"
            isLoading={isLoading}
            columns={columns}
            data={resultData}
            options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
            localization={{ toolbar: { searchPlaceholder: "ID/Date/Status" } }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  console.log(newData);
                  const WithID = {
                    MaintainID: Genrator("GMM"),
                    Status: "Pending",
                    date: new Date(),
                    ...newData,
                  };
                  console.log(WithID);
                  add.mutate(WithID);

                  resolve();
                }),
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

export default Maintaince;
