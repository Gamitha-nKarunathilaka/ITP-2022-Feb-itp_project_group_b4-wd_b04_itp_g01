import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { Chip, Container } from "@mui/material";
import Notification from "../../component/Notification/Notification";
import { colorchange } from "../../component/IdGenrarator/ColorChanger";
async function fetchReservation() {
  const res = await publicRequest.get(`Reservation/getAll`);
  return res;
}

export default function ReservationClient() {
  const [result, setResult] = useState([]);
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const statuses = {
    Pending: "Pending",
    Complete: "Complete",
    Approved: "Approved",
    Rejected: "Rejected",
  };
  const ServiceType = {
    GeneralService: "General Service",
    WarrantyClaim: "Warranty Claim",
    FreeService: "Free Servicec",
    Other: "Other",
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
  const [columns, setColumns] = useState([
    {
      title: "Title",
      field: "title",
      editable: () => {
        conditon(result.status);
      },
      validate: (rowData) => {
        if (rowData.title === undefined || rowData.title === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Mobile No",
      field: "mobileNo",
      sorting: false,
      searchable: false,
      validate: (rowData) => {
        if (rowData.mobileNo === undefined || rowData.mobileNo === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Service Type",
      field: "serviceType",
      sorting: false,
      searchable: false,
      lookup: ServiceType,
    },
    {
      title: "Vehicle RegistationNo",
      field: "vehicleRegistationNo",
      sorting: false,
      validate: (rowData) => {
        if (
          rowData.vehicleRegistationNo === undefined ||
          rowData.vehicleRegistationNo === ""
        ) {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Message",
      field: "comment",
      validate: (rowData) => {
        if (rowData.comment === undefined || rowData.comment === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Date",
      field: "date",
      editable: false,
    },
    {
      title: "Time",
      field: "Time",
      editable: false,
    },
    {
      title: "status",
      field: "Status",
      editable: () => {
        conditon(result.status);
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

  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Reservation"],
    () => fetchReservation()
  );
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
        message: "Successfully Updated",
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
      setResult(payload);
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
    <Container component="main" maxWidth="xl">
      <MaterialTable
        title="Your Reservation"
        columns={columns}
        data={result}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const id = oldData._id;
              console.log(id);
              console.log(newData);
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
    </Container>
  );
}
