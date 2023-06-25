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
  numberWithCommas,
} from "../../component/IdGenrarator/ColorChanger";
import { LoadingButton } from "@mui/lab";

//fetch data
async function fetchClaims() {
  const res = await publicRequest.get(`vehicle/report`);
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
export default function VehicleReport() {
  const classes = userStyle();
  let totalProfit = 0;
  let totalsell = 0;
  let curruntData = [];
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
    ["Vehiclereport"],
    () => fetchClaims()
  );

  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("VehicalReport/add", claim);
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
  const makeArray = (id, date, Selling, profit, Starting) => {
    let objData = {
      VehicleID: id,
      sellDate: date,
      Starting: Starting,
      Selling: Selling,
      Profit: profit,
    };
    curruntData.push(objData);
  };

  const getsoldPrice = (arr) => {
    if (arr.length != 0) {
      if (arr.length != 1) {
        let max = arr[0].value;
        for (let i = 1; i < arr.length; i++) {
          if (max <= arr[i].value) {
            totalsell += arr[i].value;
            return arr[i].value;
          } else {
            console.log(max);
          }
        }
      } else {
        totalsell += arr[0].value;
        return arr[0].value;
      }
    }
  };

  const getsoldDate = (arr) => {
    if (arr.length != 0) {
      if (arr.length != 1) {
        let max = arr[0].value;
        for (let i = 1; i < arr.length; i++) {
          if (max <= arr[i].value) {
            return dateFormatter(arr[i].bidDate);
          }
        }
      } else {
        return dateFormatter(arr[0].bidDate);
      }
    }
  };

  const calProfit = (start, sold) => {
    let profit = sold - start;
    totalProfit += profit;
    return profit;
  };

  const handleSubmit = () => {
    console.log(totalProfit);
    const WithID = {
      reportID: Genrator("GMFVR"),
      reportData: curruntData,
      time: reportTime,
      duration: periode,
      TotalProfit: totalProfit,
    };
    console.log(WithID);
    add.mutate(WithID);
  };

  useEffect(() => {
    // totalProfit = 0;
    totalsell = 0;
    // curruntData = [];
    if (isSuccess) {
      const payload = data.data.Vehicles;
      if (payload != undefined) {
        setisEmpty(false);
        setRows(payload);
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
                  <TableCell>Vehicle ID</TableCell>
                  <TableCell>Starting Price&nbsp;(LKR)</TableCell>
                  <TableCell>Sold Date</TableCell>
                  <TableCell align="right">Sold Price&nbsp;(LKR)</TableCell>

                  <TableCell align="right">Total Profit&nbsp;(LKR)</TableCell>
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
                      key={row.VehicleNo}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.VehicleNo}</TableCell>
                      <TableCell>{numberWithCommas(row.Price)}</TableCell>
                      <TableCell>{getsoldDate(row.Bid)}</TableCell>
                      <TableCell align="right">
                        {" "}
                        {numberWithCommas(getsoldPrice(row.Bid))}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(
                          calProfit(row.Price, getsoldPrice(row.Bid))
                        )}
                      </TableCell>
                      {makeArray(
                        row.VehicleNo,
                        getsoldDate(row.Bid),
                        getsoldPrice(row.Bid),
                        calProfit(row.Price, getsoldPrice(row.Bid)),
                        row.Price
                      )}
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={1}>Subtotal</TableCell>
                  <TableCell align="right">
                    {numberWithCommas(totalsell)}
                  </TableCell>
                  <TableCell align="right">
                    {numberWithCommas(totalProfit)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
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
