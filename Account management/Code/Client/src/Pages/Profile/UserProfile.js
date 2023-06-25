import {
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Tab,
  Box,
  Divider,
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import React, { useState, SyntheticEvent } from "react";
import Header from "../../component/Menu/ClientMenu";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import FeedBackClient from "../FeedBack/FeedBackClient";
import ReservationClient from "../Reservations/ReservationClient";
const useStyle = makeStyles((theme) => ({
  roots: {
    margin: "50px auto",
    background: theme.palette.background.paper,
  },
  container: {
    margin: "10px auto",
    height: "150vh",
    padding: "20px",
    backgroundColor: "white",
    color: "black",
  },
  card: {
    margin: "0 auto",
  },
  img: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
  },
  grid: {
    alignItems: "center",
  },
}));
export default function UserProfile() {
  const classes = useStyle();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg" className={classes.roots}>
        <Paper style={{ padding: "20px" }}>
          <Stack direction="row" justifyContent="end">
            <IconButton aria-label="delete" size="large">
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Stack>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="left"
                style={{ marginBottom: "10px" }}
              >
                <Typography component="h1" variant="h3" color="primary">
                  User Profile
                </Typography>
              </Stack>
              <Divider style={{ width: "100%", margin: "10px" }} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Stack direction="column" alignItems="center">
                <img
                  className={classes.img}
                  src="https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/Screenshot%20(1296).jpg?alt=media&token=3da38b64-131f-4771-b1e6-1804989d0014"
                />
                <Typography
                  component="h3"
                  variant="h5"
                  style={{ marginTop: "20px" }}
                  color="GrayText"
                >
                  Heshan Madhuranga
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={9} style={{ padding: "50px" }}>
              <Stack
                direction="row"
                justifyContent="left"
                style={{ padding: "10px" }}
              >
                <Typography variant="h6" color="primary">
                  Email:
                  <Typography color="GrayText">mheshan27@gmail.com</Typography>
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="left" spacing={12}>
                <Grid container style={{ padding: "10px" }}>
                  <Grid item xs={12} sm={6}>
                    {" "}
                    <Typography variant="h6" color="primary">
                      Address:<Typography color="GrayText">sde</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                      Phone No<Typography color="GrayText">0717586</Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Container component="main" maxWidth="lg" className={classes.root}>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="Tabs example"
                textColor="primary"
                indicatorColor="primary"
                variant="standard"
                scrollButtons="auto"
              >
                <Tab iconPosition="start" label="Purchases " value="1" />
                <Tab label="Feedbacks" value="2" />
                <Tab label="Reservation History" value="3" />
              </TabList>
            </Box>
            <Paper>
              <TabPanel value="1">Item One</TabPanel>
              <TabPanel value="2">
                <FeedBackClient />
              </TabPanel>
              <TabPanel value="3">
                <ReservationClient />
              </TabPanel>
            </Paper>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}
