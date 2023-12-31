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
  const res = await publicRequest.get(`FeedBack/feedbackreport`);
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
export default function ReportFeedBack() {
  const classes = userStyle();
  const [reportDate, setReportDate] = useState(dateFormatter(new Date()));
  const [reportTime, setReportTime] = useState(timeFormatter(new Date()));
  const [reportID, setreportID] = useState(Genrator("GMRF"));
  const [periode, setperiode] = useState(getMonthe());
  const [isEmpty, setisEmpty] = useState(true);
  const [isload, setisload] = useState(false);
  const [rows, setRows] = useState([{}]);
  const [crntdata, setcrntdata] = useState([]);
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  //featch data useQuery
  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["FeedBackReport"],
    () => fetchClaims()
  );

  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("warrantyReport/addReport", claim);
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

  const getTotalCount = () => {
    let counts = rows.length;
    return counts;
  };
  const getAvg = () => {
    let total = 0;
    rows.forEach((row) => {
      console.log(row.Rate);
      total += row.Rate;
    });
    let avg = total / getTotalCount();
    console.log("avg" + avg);
    return avg;
  };
  const makeArray = () => {
    rows.map((value) => {
      setcrntdata((crntdata) => [
        ...crntdata,
        {
          warrentyNo: value.warrentyNo,
          dateofRepair: value.dateOfRepair,
          expireDate: value.warrantyTill,
          Status: value.status,
        },
      ]);
    });
  };

  const handleSubmit = () => {
    setisload(true);
    const WithID = {
      reportID: Genrator("GMWR"),
      reportData: crntdata,
      time: reportTime,
      duration: periode,
      TotalClaimed: getTotalCount(rows, "Claimed"),
      TotalIssue: getTotalCount(rows, "Valid"),
      TotalExpired: getTotalCount(rows, "Expired"),
    };
    console.log(WithID);
    add.mutate(WithID);
  };

  useEffect(() => {
    setcrntdata([]);
    if (isSuccess) {
      const payload = data.data.feedBacks;
      console.log(payload);
      if (payload != undefined) {
        setisEmpty(false);
        setRows(payload);
        makeArray();
      } else {
        setisEmpty(true);
        console.log("notisSuccess");
      }
    }
    if (isError) {
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
                  <TableCell>Warranty No</TableCell>
                  <TableCell align="right">date of Repair</TableCell>
                  <TableCell align="right">Message</TableCell>
                  <TableCell align="right">Rate</TableCell>
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
                  rows.map((row) => (
                    <TableRow
                      key={row.Feedback_ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.Feedback_ID}</TableCell>
                      <TableCell align="right">
                        {dateFormatter(row.Feedback_Date)}
                      </TableCell>
                      <TableCell align="right">{row.FeedbackMsg}</TableCell>
                      <TableCell align="right">{row.Rate}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {isSuccess && !isEmpty && (
          <Box sx={{ marginTop: "20px", marginLeft: "20px" }}>
            {/* <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
              {getTotalCount(rows, "Claimed") != 0 && (
                <Typography component="h1" variant="h6">
                  Total Claimed -: {getTotalCount(rows, "Claimed")}
                </Typography>
              )}
            </Stack> */}
            <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
              {getAvg() != 0 && (
                <Typography component="h1" variant="h6">
                  Avg Rate -: {getAvg()}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
              {getTotalCount() != 0 && (
                <Typography component="h1" variant="h6">
                  Total Response -: {getTotalCount()}
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
