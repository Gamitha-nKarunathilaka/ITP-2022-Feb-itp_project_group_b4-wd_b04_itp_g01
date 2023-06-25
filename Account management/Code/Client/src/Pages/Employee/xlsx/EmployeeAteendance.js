import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import * as XLSX from "xlsx/xlsx.mjs";
import { Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Notification from "../../../component/Notification/Notification";
import { publicRequest } from "../../../axiosRequest/defaultAxios";
import {
  colorchange,
  dateFormatter,
  timeFormatter,
  getMonthe,
  monthe,
  year,
} from "../../../component/IdGenrarator/ColorChanger.js";
import Genrator from "../../../component/IdGenrarator/RandomID";
const EXTENSIONS = ["xlsx", "xls", "csv"];

const userStyle = makeStyles((theme) => ({
  roots: {
    marginTop: "50px",
    marginBottom: "50px",
    border: "1px",
    borderColor: "rgba(255,255,255,0.)",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
  },
  container: {
    border: "1px solid black",
  },
  box: {
    marginTop: "20px",
  },
}));

function Attendence() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const classes = userStyle();
  const [crntdata, setcrntdata] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Attendence/add", claim);
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

  const upload = () => {
    const WithID = {
      AttendenceId: Genrator("GMEA"),
      Year: year(),
      monthe: monthe(),
      attandance: data,
    };
    console.log(WithID);
    add.mutate(WithID);

    console.log(data);
  };

  const checkDataEmpty = () => {
    if (data == "undefined") {
      return true;
    } else {
      return false;
    }
  };

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index].replace(/\s+/g, "")] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // console.log(fileData)
      const headers = fileData[0];
      const heads = headers.map((head) => ({
        title: head,
        field: head.replace(/\s+/g, ""),
        sorting: false,
      }));
      setColDefs(heads);

      //removing header
      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };

  return (
    <div className={classes.roots}>
      <Container>
        <div className="App">
          <h4 align="center">Import Data from Excel, CSV </h4>
          <input type="file" onChange={importExcel} accept=".xls,.xlsx,.csv" />
          <MaterialTable
            title="Attendence"
            data={data}
            columns={colDefs}
            actions={[
              {
                icon: () => <Button variant="contained">Submit</Button>,
                tooltip: "Add User",
                isFreeAction: true,
                onClick: () => upload(),
                hidden: checkDataEmpty(),
              },
            ]}
          />
        </div>
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Attendence;
