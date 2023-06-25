import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Logo from "../../resource/img/Logo/Logo.jpg";
import makeStyles from "@mui/styles/makeStyles";
import Genrator from "../../component/IdGenrarator/RandomID";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import Notification from "../../component/Notification/Notification";
import {
  colorchange,
  dateFormatter,
  timeFormatter,
  getMonthe,
} from "../../component/IdGenrarator/ColorChanger";
import { LoadingButton } from "@mui/lab";

//fetch data
async function fetchClaims() {
  const res = await publicRequest.get(`Attendence/get`);
  return res;
}

//fetch data
async function fetchbasicSalary() {
  const res = await publicRequest.get(`employee/getsalary`);
  return res;
}
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
export default function EmployeSalary() {
  const classes = userStyle();
  let total = 0;

  const curruntData = [];
  const [reportDate, setReportDate] = useState(dateFormatter(new Date()));
  const [reportTime, setReportTime] = useState(timeFormatter(new Date()));
  const [reportID, setreportID] = useState(Genrator("GMRF"));
  const [periode, setperiode] = useState(getMonthe());
  const [isEmpty, setisEmpty] = useState(true);
  const [isload, setisload] = useState(false);
  const [rows, setRows] = useState([{}]);
  const [basic, setBasic] = useState([{}]);
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["Salary"],
    () => fetchClaims()
  );

  //featch basic salary
  const {
    isSuccess: success,
    data: EmployeeData,
    isLoading: load,
    isError: errorocur,
    error: err,
  } = useQuery(["EmployeBasicSalary"], () => fetchbasicSalary());

  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("FinanceReport/add", claim);
  };

  //insert
  const add = useMutation(addClaims, {
    onSuccess: () => {
      setisload(false);
      setNotify({
        isOpen: true,
        message: "Successfully added",
        type: "success",
      });
      navigate(-1);
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
  const makeArray = () => {
    rows.map((value) => {
      let objData = {
        EmployeeID: value.EmployeeID,
        TotalAttendence: value.TotalAttendence,
        OTHours: value.OTHours,
        OTHoursTotal: value.OTHoursTotal,
        TotalSalry: value.TotalSalry,
      };
      curruntData.push(objData);
    });
  };

  const otsalaryCal = (count) => {
    return 150 * count;
  };
  const calattendenesalary = (id, att) => {
    for (var i = 0; i < basic.length; i++) {
      if (basic[i].employeeId == id) {
        return basic[i].basicSalary - att * 1500;
      }
    }
  };

  const calTotal = (att, ot) => {
    total += att + ot;
    return att + ot;
  };

  const handleSubmit = () => {
    // setisload(true);
    makeArray();
    console.log(curruntData);
    const WithID = {
      reportID: Genrator("GMFSR"),
      reportData: curruntData,
      time: reportTime,
      duration: periode,
      TotalSalaryPay: total,
    };
    console.log(WithID);
    add.mutate(WithID);
  };

  const addNewValues = (index, row) => {
    rows[index] = {
      ...row,
      OTHoursTotal: otsalaryCal(row.OTHours),
      TotalSalry: calTotal(
        calattendenesalary(row.EmployeeID, row.Nopaylevaves),
        otsalaryCal(row.OTHours)
      ),
    };
  };

  useEffect(() => {
    total = 0;
    if (isSuccess) {
      const payload = data.data.Attendence;
      console.log(payload[0].attandance);
      if (payload != undefined) {
        setisEmpty(false);
        setRows(payload[0].attandance);
        // makeArray();
      } else {
        setisEmpty(true);
        console.log("notisSuccess");
      }
    }
    if (isError) {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
    }

    if (success) {
      const payloaddata = EmployeeData.data.Employees;
      console.log(payloaddata);
      if (payloaddata != undefined) {
        setisEmpty(false);
        console.log(payloaddata);
        setBasic(payloaddata);
        // makeArray();
      } else {
        setisEmpty(true);
        console.log("notisSuccess");
      }
    }

    if (errorocur) {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${err}`,
        type: "error",
      });
    }
  }, [data, rows, error]);

  return (
    <div className={classes.roots}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.box}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Avatar src={Logo} sx={{ width: 75, height: 75 }}></Avatar>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            sx={{ margin: "20px" }}
          >
            <Typography component="h2" variant="h5">
              Gallage Moters (pvt) Ltd.
            </Typography>
            <Typography>
              Contact:0771423837 Email: GallageMotors@gmail.com
            </Typography>
            <Typography>Monthly Feedback Report</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography>Time Duration: {periode} </Typography>
                  <Typography> Generated Date: {reportDate}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography> Report ID: {reportID} </Typography>
                  <Typography> Generated Time: {reportTime} </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Box>
          <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>EmployeeID</TableCell>
                  <TableCell>Total Attendenc</TableCell>
                  <TableCell>OTHours</TableCell>
                  <TableCell>OTHours Salary</TableCell>
                  <TableCell align="right">Total Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ||
                  (isEmpty &&
                    [1, 2, 3, 4, 5, 6].map((item) => {
                      return (
                        <TableRow
                          key={item}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="right">
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell align="right">
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell align="right">
                            <Skeleton animation="wave" />
                          </TableCell>
                          <TableCell align="right">
                            <Skeleton animation="wave" />
                          </TableCell>
                        </TableRow>
                      );
                    }))}

                {isSuccess &&
                  !isEmpty &&
                  rows.map((row, index) => (
                    <TableRow
                      key={row.EmployeeID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.EmployeeID}</TableCell>
                      <TableCell>{row.TotalAttendence}</TableCell>
                      <TableCell>{row.OTHours}</TableCell>
                      <TableCell>{otsalaryCal(row.OTHours)}</TableCell>
                      <TableCell align="right">
                        {calTotal(
                          calattendenesalary(row.EmployeeID, row.Nopaylevaves),
                          otsalaryCal(row.OTHours)
                        )}
                      </TableCell>
                      {addNewValues(index, row)}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {isSuccess && !isEmpty && (
          <Box sx={{ marginTop: "20px", marginLeft: "20px" }}>
            <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
              {total != 0 && (
                <Typography
                  component="h1"
                  variant="h6"
                  sx={{ marginLeft: "40px" }}
                >
                  Total Salary Pay-: {total}
                </Typography>
              )}
            </Stack>
          </Box>
        )}
        <Box sx={{ margin: "20px" }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <LoadingButton
              loading={isload}
              loadingPosition="start"
              startIcon={<DoneIcon />}
              variant="contained"
              type="submit"
              style={{ margin: "20px" }}
              onClick={handleSubmit}
            >
              generate
            </LoadingButton>
          </Stack>
        </Box>
      </Container>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
