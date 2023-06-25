import { Container, IconButton, Paper, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";

import Genrator from "../../component/IdGenrarator/RandomID";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import Notification from "../../component/Notification/Notification";

import { useMutation, useQuery, useQueryClient } from "react-query";
import MaterialTable from "@material-table/core";

//fetch data
async function fetchFeedback() {
  const res = await publicRequest.get(`FeedBack/getAll`);
  return res;
}
export default function FeedBackClient() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [resultData, setResultData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //   featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["feedback"],
    () => fetchFeedback()
  );
  function formatDate(thedate) {
    return (
      thedate.getFullYear() +
      "/" +
      (thedate.getMonth() + 1) +
      "/" +
      thedate.getDate()
    );
  }
  const [columns, setColumns] = useState([
    {
      field: "Feedback_ID",
      title: "Feedback ID ",
      editable: false,
      sorting: false,
    },
    {
      field: "Feedback_Date",
      title: "Feedback Date",
      editable: false,
      sorting: false,
    },

    {
      field: "FeedbackMsg",
      title: "FeedbackMsg",
      sorting: false,
      searchable: false,
      validate: (rowData) => {
        if (rowData.FeedbackMsg === undefined || rowData.FeedbackMsg === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "Rate",
      title: "Rate",
      searchable: false,
      render: (rowData) => (
        <Rating
          name="half-rating-read"
          defaultValue={rowData.Rate}
          precision={0.5}
          readOnly
        />
      ),
      editComponent: (props) => (
        <Rating
          defaultValue={props.value}
          onChange={(e, value) => {
            props.onChange(value);
          }}
          precision={0.5}
        />
      ),
      validate: (rowData) => {
        if (rowData.Rate === undefined || rowData.Rate === 0) {
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
    const res = await publicRequest.post("FeedBack/add", claim);
  };
  //delete data
  const deleteClaims = (id) => {
    console.log(id);
    return publicRequest.delete(`FeedBack/delete/${id}`);
  };
  //update
  const updateClaims = (newData) => {
    const id = newData._id;

    return publicRequest.put(`FeedBack/update/${id}`, newData);
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

      queryClient.invalidateQueries("feedback");
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

      queryClient.invalidateQueries("feedback");
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

      queryClient.invalidateQueries("feedback");
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
      const payload = data.data.FeedBacks;
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
    <Container component="main" maxWidth="xl">
      <MaterialTable
        title="feedback Details"
        isLoading={isLoading}
        columns={columns}
        data={resultData}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        localization={{ toolbar: { searchPlaceholder: "ID" } }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              console.log(newData);
              const day = formatDate(new Date());
              const edited = {
                Feedback_ID: Genrator("GMF"),
                Feedback_Date: day,
                ...newData,
              };
              add.mutate(edited);

              resolve();
            }),
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
