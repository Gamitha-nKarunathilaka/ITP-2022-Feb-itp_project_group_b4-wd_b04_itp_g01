import { Button as btn, Container, Paper, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Genrator from "../../component/IdGenrarator/RandomID";
import Notification from "../../component/Notification/Notification";

import { publicRequest } from "../../axiosRequest/defaultAxios";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import MaterialTable from "@material-table/core";
import { DatePicker } from "@mui/lab";

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
async function fetchbill() {
  const res = await publicRequest.get(`Bill/getAll`);
  return res;
}

const Bill = () => {
  const navigate = useNavigate();
  const classes = userStyle();
  const queryClient = useQueryClient();
  const [resultData, setResultData] = useState([]);

  function formatDate(thedate) {
    return (
      thedate.getFullYear() +
      "/" +
      (thedate.getMonth() + 1) +
      "/" +
      thedate.getDate()
    );
  }

  const handleDateChange = (dates) => {
    console.log(dates);
    const after = formatDate(new Date(dates));
    console.log(after);
    return after;
  };

  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Bill"],
    () => fetchbill()
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const jobroles = {
    Technicians: "Technicians",
    Admin: "Admin",
    "Quality Checker": "Quality Checker",
  };
  const [columns, setColumns] = useState([
    {
      field: "Billl_ID",
      title: " Billl ID",
      editable: false,
      sorting: false,
    },
    {
      field: "Total",
      title: "Total",
      searchable: false,
      type: "currency",
      currencySetting: { currencyCode: "LKR" },
      validate: (rowData) => {
        if (rowData.Total === undefined || rowData.Total === "") {
          return "Required";
        }
        return true;
      },
    },

    {
      field: "date",
      title: "Date",
      sorting: false,
      editable: false,
      editComponent: (props) => (
        <DatePicker
          label="Date of Expire"
          renderInput={(params) => (
            <TextField
              fullWidth
              margin="normal"
              {...params}
              variant="standard"
            />
          )}
          value={formatDate(new Date())}
          readOnly
          onChange={(e) => props.onChange(handleDateChange(e))}
        />
      ),
    },
    {
      field: "ItemCount",
      title: "ItemCount",
      searchable: false,
      sorting: false,
      type: "numeric",
      validate: (rowData) => {
        if (rowData.ItemCount === undefined || rowData.ItemCount === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "discount",
      title: "Discount",
      searchable: false,
      type: "currency",
      currencySetting: { currencyCode: "LKR" },
      sorting: false,
    },
  ]);

  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Bill/add", claim);
  };

  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`Bill/delete/${id}`);
  };

  //update
  const updateClaims = (newData) => {
    const id = newData._id;
    return publicRequest.put(`Bill/update/${id}`, newData);
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

      queryClient.invalidateQueries("Bill");
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

      queryClient.invalidateQueries("Bill");
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

      queryClient.invalidateQueries("Bill");
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
      const payload = data.data.Bills;
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
            title="Billing Details"
            isLoading={isLoading}
            columns={columns}
            data={resultData}
            options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
            actions={[
              {
                icon: () => <AddIcon />,
                tooltip: "Add Bill",
                isFreeAction: true,
                onClick: (event) => navigate("add"),
              },
            ]}
            localization={{ toolbar: { searchPlaceholder: "ID/Date" } }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  const WithID = {
                    Billl_ID: Genrator("GMB"),
                    date: formatDate(new Date()),
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

export default Bill;
