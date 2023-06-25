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

//fetch data
async function fetchEmployee() {
  const res = await publicRequest.get(`Employee/getAll`);
  return res;
}

const Employee = () => {
  const navigate = useNavigate();
  const classes = userStyle();
  const queryClient = useQueryClient();
  const [resultData, setResultData] = useState([]);
  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Employee"],
    () => fetchEmployee()
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
      field: "employeeId",
      title: "Employee ID",
      editable: false,
      sorting: false,
    },
    {
      field: "employeeName",
      title: "EmployeeName",
      searchable: false,
      validate: (rowData) => {
        if (rowData.employeeName === undefined || rowData.employeeName === "") {
          return "Required";
        }
        return true;
      },
    },

    {
      field: "nic",
      title: "NIC",
      sorting: false,
      validate: (rowData) => {
        if (rowData.nic === undefined || rowData.nic === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "address",
      title: "Address",
      searchable: false,
      sorting: false,
      validate: (rowData) => {
        if (rowData.address === undefined || rowData.address === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "contactNo",
      title: "Contact No",
      searchable: false,
      sorting: false,
      validate: (rowData) => {
        if (rowData.contactNo === undefined || rowData.contactNo === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "basicSalary",
      title: "Basic Salary",
      searchable: false,
      validate: (rowData) => {
        if (rowData.basicSalary === undefined || rowData.basicSalary === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "jobRole",
      title: "Job Role",
      lookup: jobroles,
      sorting: false,
      searchable: false,
      validate: (rowData) => {
        if (rowData.jobRole === undefined || rowData.jobRole === "") {
          return "Required";
        }
        return true;
      },
    },
  ]);

  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Employee/add", claim);
  };

  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`Employee/delete/${id}`);
  };

  //update
  const updateClaims = (newData) => {
    const id = newData._id;
    return publicRequest.put(`Employee/update/${id}`, newData);
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

      queryClient.invalidateQueries("Employee");
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

      queryClient.invalidateQueries("Employee");
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
        message: "Successfully Updated",
        type: "success",
      });

      queryClient.invalidateQueries("Employee");
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
      const payload = data.data.Employees;
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
            title="Employee Details"
            isLoading={isLoading}
            columns={columns}
            data={resultData}
            options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
            localization={{ toolbar: { searchPlaceholder: "ID/NIC" } }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  const WithID = {
                    employeeId: Genrator("Emp"),
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

export default Employee;
