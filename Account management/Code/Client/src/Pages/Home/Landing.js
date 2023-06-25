import { useState, useRef, useEffect } from "react";
import { Link as Scroll } from "react-scroll";
import bg from "../../resource/img/plaeholders/bg.jpg";
import { TweenMax, TimelineLite, Power3 } from "gsap/all";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { KeyboardArrowDown } from "@mui/icons-material";
import clsx from "clsx";
const userStyle = makeStyles((theme) => ({
  mainroot: {
    minHeight: "100vh",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    direction: "column",
    background: `rgba(0,0,0,0.7) url(${bg})`,
    backgroundRepeat: " no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  box: {
    margin: "auto 0",
    marginleft: "200px",
    minHeight: "250px",
    maxWidth: "800px",
    minWidth: "250px",
    textAlign: "center",
  },
  paper: {
    padding: "40px",
    margin: "40px",
  },
  typo: {
    fontSize: "1.4rem",
    Width: "50%",

    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
    typop: {
      color: "#ffffff",
    },
  },
  type: {
    "&MuiTypography-root": {
      lineHeight: "0.5",
    },
  },
}));

const Landing = () => {
  const classes = userStyle();
  const refItems = useRef(null);
  const theme = useTheme();
  const reslution = useMediaQuery(theme.breakpoints.down("sm"));
  const tl = new TimelineLite();

  // Animation for fading in
  const fadeIn = (element) => {
    tl.from(element, 2, {
      opacity: 0,
      y: 100,
      ease: "power4.out",
      stagger: {
        amount: 1.5,
      },
    });
  };

  useEffect(() => {
    console.log(refItems);
    // tl.from(refItems.current, 1.0, {
    //   opacity: 0,
    //   ease: Power3.easeIn,
    //   stagger: { amount: 0.3 },
    // });
    fadeIn(".fadeIn");
  }, []);

  return (
    <div className={classes.mainroot}>
      <Container maxWidth="xl" className={classes.container}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid item xs={12}>
            <Container className={classes.box} maxWidth="sm">
              <Box style={{ marginBottom: "120px", marginTop: "150px" }}>
                <Typography
                  ref={refItems}
                  className="fadeIn"
                  component="h2"
                  variant={reslution ? "h4" : "h2"}
                  style={{
                    margin: "2px 0",
                    fontSize: "88px",
                    color: "white",
                  }}
                >
                  WE ARE QUALIFIED
                </Typography>
                <Typography
                  ref={refItems}
                  classes="fadeIn"
                  component="h5"
                  variant={reslution ? "h6" : "h4"}
                  style={{
                    margin: "2px 0",
                    fontSize: "88px",
                    color: "white",
                  }}
                >
                  &
                </Typography>
                <Typography
                  ref={refItems}
                  className="fadeIn"
                  component="h1"
                  variant={reslution ? "h4" : "h2"}
                  style={{
                    margin: "1px 0",
                    color: "#1FF072",
                  }}
                >
                  PROFESSIONAL
                </Typography>
                <Box>
                  <Typography
                    variant="body2"
                    component="p"
                    align="center"
                    style={{
                      fontSize: "1.2rem",
                      color: "white",
                      wordSpacing: "5px",
                    }}
                    className={classes.typop}
                    ref={refItems}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley ike Aldus PageMaker including versions
                    of Lorem Ipsum.industry's standard dummy text ever since the
                    1500s, when an unknown printer took a galley ike Aldus
                    PageMaker including versions of Lorem
                  </Typography>
                </Box>
                <Scroll
                  to="review"
                  smooth={true}
                  duration={500}
                  delay={250}
                  isDynamic={true}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    className="fadeIn"
                    endIcon={<KeyboardArrowDown />}
                    style={{
                      marginTop: "40px",
                    }}
                    ref={refItems}
                  >
                    Learn More
                  </Button>
                </Scroll>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
//using props
export default Landing;
