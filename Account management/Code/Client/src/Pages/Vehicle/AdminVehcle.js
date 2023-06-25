import MaterialTable from "@material-table/core";
import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Notification from "../../component/Notification/Notification";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PopUp from "../../component/PopUp/PopUp";
import Form from "./Form";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { useMutation, useQuery, useQueryClient } from "react-query";

async function fetchClaims() {
  const res = await publicRequest.get(`Vehicle/all`);
  return res;
}

export default function AdminVehcle() {
  const [openPopup, setOpenPopUp] = useState(false);
  const [curruntData, setcurruntData] = useState(null);
  const [resultData, setResultData] = useState([]);
  const queryClient = useQueryClient();
  const sendata = (event, data) => {
    setOpenPopUp(true);
    console.log(data);
    setcurruntData(data);
  };

  const addData = () => {
    setOpenPopUp(true);
    setcurruntData(null);
  };
  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`Vehicle/delete/${id}`);
  };
  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Vehicle"],
    () => fetchClaims()
  );
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [columns, setColumns] = useState([
    {
      title: "Vehicle No",
      field: "VehicleNo",
      readonly: true,
      sorting: false,
      editable: false,
    },
    {
      title: "Starting Price",
      field: "Price",
      editable: false,
      type: "currency",
      currencySetting: { currencyCode: "LKR" },
      searchable: false,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Brand",
      field: "Brand",
      sorting: false,
      editable: false,
    },
    {
      title: "Manufacture Year",
      field: "YearofManufacture",
      editable: false,
      sorting: false,
    },
    {
      title: "Mileage",
      field: "Mileage",
      sorting: false,
      searchable: false,
    },
    {
      title: "FuelType",
      field: "FuelType",
      sorting: false,
      searchable: false,
    },
    {
      title: "Engine Capacity",
      field: "EngineCapacity",
      sorting: false,
      searchable: false,
    },
  ]);
  //delete
  const deleteReq = useMutation(deleteClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully Deleted",
        type: "success",
      });

      queryClient.invalidateQueries("Vehicle");
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
      const payload = data.data.vehicle;
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
    <Container style={{ marginTop: "50px" }}>
      <MaterialTable
        title="Vehicle Details"
        isLoading={isLoading}
        columns={columns}
        data={resultData}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        localization={{ toolbar: { searchPlaceholder: "No/Brand/Year" } }}
        actions={[
          {
            icon: () => <AddIcon />,
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => addData(),
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Update",
            onClick: (event, rowData) => sendata(event, rowData),
          },
        ]}
        editable={{
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
        title="Add Vehicle"
        openPopup={openPopup}
        setOpenPopUp={setOpenPopUp}
      >
        <Form
          data={curruntData}
          setOpenPopUp={setOpenPopUp}
          setNotify={setNotify}
        />
      </PopUp>
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
}
