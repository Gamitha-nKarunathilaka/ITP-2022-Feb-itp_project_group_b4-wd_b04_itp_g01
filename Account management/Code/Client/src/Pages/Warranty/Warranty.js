import { Container, CssBaseline, Button, Chip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../component/PopUp/PopUp";
import AddIcon from "@mui/icons-material/Add";
import Notification from "../../component/Notification/Notification";
import Pdftemplate from "../../component/Pdftemplate/Pdftemplate";
import PageviewIcon from "@mui/icons-material/Pageview";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { useReactToPrint } from "react-to-print";
import {
  colorchange,
  dateFormatter,
} from "../../component/IdGenrarator/ColorChanger";
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
    marginTop: "50px",
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
async function fetchClaims() {
  const res = await publicRequest.get(`warrenty/getAll`);
  return res;
}

const Warrenty = () => {
  const navigate = useNavigate();
  const classes = userStyle();
  const queryClient = useQueryClient();
  const componentRef = useRef();
  const [params, setParams] = useState(null);
  const [openPopup, setOpenPopUp] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const statuses = {
    Valid: "Valid",
    Expired: "Expired",
    Claimed: "Claimed",
  };
  function conditon(status) {
    switch (status) {
      case "Valid":
        return true;
      case "Expired":
        return true;
      case "Claimed":
        return true;
    }
  }

  const [columns, setColumns] = useState([
    {
      title: "Warranty No",
      field: "warrentyNo",
      readonly: true,
      sorting: false,
      editable: false,
    },
    {
      title: "Customer Name",
      field: "customerName",
      editable: false,
      searchable: false,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Technician",
      field: "technician",
      searchable: false,
      sorting: false,
      editable: false,
    },
    {
      title: "Contact No",
      field: "contactNo",
      editable: false,
      searchable: false,
      sorting: false,
    },
    {
      title: "Expire Date",
      field: "warrantyTill",
      sorting: false,
      searchable: false,
      render: (rowdata) => {
        return dateFormatter(rowdata.warrantyTill);
      },
    },
    {
      title: "Status",
      field: "status",
      lookup: statuses,
      sorting: false,
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
    ["warrenty"],
    () => fetchClaims()
  );

  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`warrenty/delete/${id}`);
  };

  //update
  const updateClaims = (newData) => {
    const id = newData._id;
    return publicRequest.put(`warrenty/update/${id}`, newData);
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

      queryClient.invalidateQueries("warrenty");
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

      queryClient.invalidateQueries("warrenty");
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
    },
  });

  const popUpPdf = (data) => {
    setParams(data);
    setOpenPopUp(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const payload = data.data.warrenties;
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
  }, [data, error, isError, isSuccess]);

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="xl" className={classes.main}>
        <CssBaseline />

        <MaterialTable
          title="Warranty Details"
          isLoading={isLoading}
          columns={columns}
          data={resultData}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Add User",
              isFreeAction: true,
              onClick: (event) => navigate("form"),
            },
            {
              icon: () => <PageviewIcon />,
              tooltip: "view",
              onClick: (event, rowData) => popUpPdf(rowData),
            },
          ]}
          options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
          localization={{ toolbar: { searchPlaceholder: "No/Status" } }}
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

        <PopUp
          title="View Warranty"
          openPopup={openPopup}
          setOpenPopUp={setOpenPopUp}
        >
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
            component="main"
            className={classes.pdf}
            ref={componentRef}
          >
            <Pdftemplate props={params} />
          </Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Button variant="contained" color="secondary" onClick={handlePrint}>
              {" "}
              Print{" "}
            </Button>
          </div>
        </PopUp>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
    </div>
  );
};

export default Warrenty;
