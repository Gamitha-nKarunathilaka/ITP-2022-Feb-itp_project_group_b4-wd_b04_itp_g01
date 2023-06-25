import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Chip, Container, Paper, Typography } from "@mui/material";
import MaterialTable, { Column } from "@material-table/core";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Notification from "../../component/Notification/Notification";
import { colorchange } from "../../component/IdGenrarator/ColorChanger";
import { publicRequest } from "../../axiosRequest/defaultAxios";
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
    marginTop: "20px",
    height: "auto",
  },
  main: {
    [theme.breakpoints.down("md")]: {
      padding: "50px 5px",
    },
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
}));

//fetch data
async function fetchClaims() {
  const res = await publicRequest.get(`claims/getAll`);
  return res;
}
//fetch data
async function fetchTecNames() {
  const res = await publicRequest.get(`employee/getnames`);
  return res;
}

export default function Claims() {
  const classes = userStyle();
  const queryClient = useQueryClient();

  const clais = {};

  const statuses = {
    Pending: "Pending",
    Complete: "Complete",
    Approved: "Approved",
    Rejected: "Rejected",
  };
  function conditon(status) {
    switch (status) {
      case "Complete":
        return false;
      case "Pending":
        return true;
      case "Approved":
        return true;
      case "Rejected":
        return true;
    }
  }
  const {
    isSuccess: success,
    data: names,
    isLoading: load,
    isError: isErr,
    error: err,
  } = useQuery(["tecnames"], () => fetchTecNames());
  //getNameFrom
  const getName = async () => {
    const res = await publicRequest.get("employee/getnames");

    const gotName = names.data.Employees;
    var i = 0;
    const objects = {};
    gotName.map((item) => {
      let id = item._id;
      clais[`${id}`] = item.employeeName;
    });
    console.log(clais);
  };

  const [columns, setColumns] = useState([
    {
      title: "Warrenty No",
      field: "warrentyNo",
      readonly: true,
      sorting: false,
      editable: "onAdd",
      validate: (rowData) => {
        if (rowData.warrentyNo === undefined || rowData.warrentyNo === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Customer Name",
      field: "customerName",
      validate: (rowData) => {
        if (rowData.customerName === undefined || rowData.customerName === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Contact No",
      field: "contactNo",
      searchable: false,
      sorting: false,
      validate: (rowData) => {
        if (rowData.contactNo === undefined || rowData.contactNo === "") {
          return "Required";
        } else if (isNaN(rowData.contactNo)) {
          return "Enter only Numbers";
        } else if (
          rowData.contactNo.length < 10 ||
          rowData.contactNo.length > 10
        ) {
          return "Enter Valid Phone Number";
        }
        return true;
      },
    },
    {
      title: "Technician Name",
      field: "technician",
      lookup: clais,
      validate: (rowData) => {
        if (rowData.technician === undefined || rowData.technician === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Reason",
      field: "reason",
      searchable: false,
      sorting: false,
      validate: (rowData) => {
        if (rowData.reason === undefined || rowData.reason === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Status",
      field: "status",
      sorting: false,
      lookup: statuses,
      validate: (rowData) => {
        if (rowData.status === undefined || rowData.status === "") {
          return "Required";
        }
        return true;
      },
      render: (rowData) => (
        <Chip
          label={rowData.status}
          color={colorchange(rowData.status)}
          variant="outlined"
        />
      ),
    },
  ]);

  const [resultData, setResultData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Claims"],
    () => fetchClaims()
  );

  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("claims/add", claim);
  };

  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`claims/delete/${id}`);
  };

  //update
  const updateClaims = (newData) => {
    const id = newData._id;

    return publicRequest.put(`claims/update/${id}`, newData);
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

      queryClient.invalidateQueries("Claims");
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

      queryClient.invalidateQueries("Claims");
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

      queryClient.invalidateQueries("Claims");
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
      const payload = data.data.Claimes;
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

    if (success) {
      getName();
    }
    if (isErr) {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${err}`,
        type: "error",
      });
    }
    //
  }, [data, error, names]);

  return (
    <Container component="main" maxWidth="xl" className={classes.main}>
      <div className={classes.paper}>
        <Paper className={classes.table}>
          <MaterialTable
            title="Warranty Claims"
            isLoading={isLoading}
            columns={columns}
            data={resultData}
            options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
            localization={{
              toolbar: { searchPlaceholder: "Name/Technician/Status" },
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  console.log(newData);
                  add.mutate(newData);

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
      </div>
    </Container>
  );
}
