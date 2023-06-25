import {
  Avatar,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { useState } from "react";

import quoteLeft from "../../resource/img/ourservice/Icons/quote-left-solid.svg";
import quoteRight from "../../resource/img/ourservice/Icons/quote-right-solid.svg";
import { makeStyles } from "@mui/styles";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "60vh",
    backgroundImage: theme.palette.background.paper,
    backgroundSize: "cover",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
  },
  container: {
    margin: "40px 0",
  },
  typo: {
    margin: "20px 0",
    color: purple[2],
  },
  card: {
    padding: "20px",
  },
  avatar: {
    marginLeft: "45%",
    marginBottom: "20px",
  },
  quotLeft: {
    width: "10%",
    marginBottom: "10px",
  },
  quotRight: {
    width: "10%",
    marginTop: "10px",
    float: "right",
  },
  title: {
    height: "0.3rem",
    width: " 5rem",
    borderRadius: " 0.1rem",
    background: "#76ff03",
    marginTop: "15px",
  },
  titleCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const Reviews = () => {
  const [spacing, setSpacing] = useState(5);

  const classes = userStyle();
  return (
    <div className={classes.roots} id="review">
      <Container className={classes.container} pb={{ xs: 5, sm: 4 }}>
        <Typography
          gutterBottom={true}
          variant="h4"
          component="h1"
          color="textPrimary"
          className={classes.typo}
        >
          Customer Review
          <div className={classes.titleCenter}>
            <div className={classes.title}>
              <span></span>
            </div>
          </div>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className={classes.card}>
              <Avatar alt="Remy Sharp" className={classes.avatar}>
                H
              </Avatar>

              <Typography variant="body1" align="justify">
                <img src={quoteLeft} className={classes.quotLeft} /> Lorem Ipsum
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley ike Aldus
                PageMaker including versions of Lorem Ipsum.{" "}
                <img src={quoteRight} className={classes.quotRight} />
              </Typography>

              <Typography
                variant="body2"
                align="right"
                style={{ marginTop: "40px" }}
              >
                Heshan Madhuranga
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} className={classes.card}>
              <Avatar alt="Remy Sharp" className={classes.avatar}>
                H
              </Avatar>

              <Typography variant="body1" align="justify">
                <img src={quoteLeft} className={classes.quotLeft} /> Lorem Ipsum
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley ike Aldus
                PageMaker including versions of Lorem Ipsum.{" "}
                <img src={quoteRight} className={classes.quotRight} />
              </Typography>

              <Typography
                variant="body2"
                align="right"
                style={{ marginTop: "40px" }}
              >
                Heshan Madhuranga
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} className={classes.card}>
              <Avatar alt="Remy Sharp" className={classes.avatar}>
                H
              </Avatar>

              <Typography variant="body1" align="justify">
                <img src={quoteLeft} className={classes.quotLeft} /> Lorem Ipsum
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley ike Aldus
                PageMaker including versions of Lorem Ipsum.{" "}
                <img src={quoteRight} className={classes.quotRight} />
              </Typography>

              <Typography
                variant="body2"
                align="right"
                style={{ marginTop: "40px" }}
              >
                Heshan Madhuranga
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Reviews;
