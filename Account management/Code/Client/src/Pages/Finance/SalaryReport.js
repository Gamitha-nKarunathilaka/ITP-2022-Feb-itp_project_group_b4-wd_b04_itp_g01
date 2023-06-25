import {
  Button as btn,
  Button,
  Container,
  Paper,
  TextField,
} from "@mui/material";
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
import {
  colorchange,
  dateFormatter,
} from "../../component/IdGenrarator/ColorChanger";
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
  const res = await publicRequest.get(`FinanceReport/getAll`);
  return res;
}

const SalaryReport = () => {
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
    ["salaryReport"],
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
      field: "reportID",
      title: "Report ID",
      sorting: false,
    },
    {
      field: "reportDate",
      title: "Report Date",
      searchable: false,
      render: (rowdata) => {
        return dateFormatter(rowdata.reportDate);
      },
    },
    {
      field: "time",
      title: "Genarated Time",
      sorting: false,
      searchable: false,
    },
    {
      field: "duration",
      title: "Time Duration",
      searchable: false,
      sorting: false,
    },
    {
      field: "TotalSalaryPay",
      title: "Total Salary To Pay",
      searchable: false,
      sorting: false,
    },
  ]);

  //Api Calls
  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`FinanceReport/delete/${id}`);
  };

  //update
  const updateClaims = (newData) => {
    const id = newData._id;
    return publicRequest.put(`Bill/update/${id}`, newData);
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

      queryClient.invalidateQueries("salaryReport");
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
    },
  });

  //   //update
  //   const updateReq = useMutation(updateClaims, {
  //     onSuccess: () => {
  //       setNotify({
  //         isOpen: true,
  //         message: "Successfully Deleted",
  //         type: "success",
  //       });

  //       queryClient.invalidateQueries("Bill");
  //     },
  //     onError: (error) => {
  //       setNotify({
  //         isOpen: true,
  //         message: "Error Occurd  " + `${error}`,
  //         type: "error",
  //       });
  //     },
  //   });

  useEffect(() => {
    if (isSuccess) {
      const payload = data.data.Reports;
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
            title="Reports Details"
            isLoading={isLoading}
            columns={columns}
            data={resultData}
            options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
            actions={[
              {
                icon: () => <Button variant="contained">Generate</Button>,
                tooltip: "Genarate Reports",
                isFreeAction: true,
                onClick: (event) => navigate("salary"),
              },
            ]}
            localization={{ toolbar: { searchPlaceholder: "ID" } }}
            editable={{
              //   onRowUpdate: (newData, oldData) =>
              //     new Promise((resolve, reject) => {
              //       const id = oldData._id;
              //       console.log(id);
              //       console.log(newData);
              //       console.log(oldData);
              //       updateReq.mutate({ ...newData });
              //       resolve();
              //     }),
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

export default SalaryReport;
