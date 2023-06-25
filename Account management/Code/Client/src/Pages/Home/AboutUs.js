import { Container, Grid, Paper, Typography } from "@mui/material";
import { useRef } from "react";
import { useIntersection } from "react-use";
import gear from "../../resource/img/ourservice/Icons/gear-solid.svg";
import screwDriver from "../../resource/img/ourservice/Icons/screwdriver-wrench-solid.svg";
import wrench from "../../resource/img/ourservice/Icons/wrench-solid.svg";
import { TweenMax, TimelineLite, Power3 } from "gsap/all";
import { makeStyles } from "@mui/styles";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "50vh",
    justifyContent: "left",
    marginBottom: "150px",
  },
  boxCard: {
    width: "350px",
    height: "180px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    marginLeft: "35%",
    padding: "20px",

    width: "100px",
    height: "100px",
  },
}));

const AboutUs = () => {
  const classes = userStyle();

  const containerRef = useRef(null);
  const tl = new TimelineLite();
  const intersection = useIntersection(containerRef, {
    root: null,
    rootMargin: "10px",
    threshold: 0.6,
  });

  const fadeIn = (element) => {
    tl.to(element, 1, {
      opacity: 1,
      y: -60,
      ease: "power4.out",
      stagger: {
        amount: 0.3,
      },
    });
    console.log("In");
  };

  const fadeOut = (element) => {
    // tl.to(element, 1, {
    //   opacity: 1,
    //   ease: "power4.out",
    //   stagger: {
    //     amount: 0.3,
    //   },
    // });
    console.log("out");
  };

  intersection && intersection.intersectionRatio <= 0.6
    ? fadeOut(".fadeFirst")
    : fadeIn(".fadeFirst");

  return (
    <div className={classes.roots} id="review">
      <Container maxWidth="lg">
        <Container
          className={classes.container}
          pb={{ xs: 5, sm: 4 }}
          maxWidth="sm"
          style={{
            marginTop: "150px",
            marginLeft: "10px",
          }}
          ref={containerRef}
        >
          <Typography
            component="h1"
            variant="h2"
            align="left"
            style={{
              opacity: "0",
            }}
            className="fadeFirst"
          >
            WHO WE ARE
          </Typography>
          <Typography
            component="h1"
            variant="h3"
            align="left"
            className="fadeFirst"
          >
            WE HAVE 25 YEARS OF
          </Typography>
          <Typography
            component="h1"
            variant="h3"
            align="left"
            className="fadeFirst"
          >
            EXPERIENCE IN THIS FIELD
          </Typography>{" "}
          <Typography
            component="p"
            variant="body1"
            align="left"
            className="fadeFirst"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley ike
            Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Container>
        <Container
          max-width="sm"
          className="fadeFirst"
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={3}>
            <Grid key="1" item xs={12} sm={6} md={4}>
              <Paper
                className={classes.boxCard}
                elevation={4}
                style={{ backgroundColor: "white" }}
              >
                <img src={screwDriver} className={classes.icon} />
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  style={{
                    marginTop: "50px",
                    color: "#212121",
                  }}
                >
                  {" "}
                  BEST TECHNICIANS
                </Typography>
              </Paper>
            </Grid>

            <Grid key="2" item xs={12} sm={6} md={4}>
              <Paper
                className={classes.boxCard}
                elevation={4}
                style={{ backgroundColor: "#0BB260" }}
              >
                <img src={gear} className={classes.icon} />
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  style={{
                    marginTop: "50px",
                    color: "#212121",
                  }}
                >
                  {" "}
                  QUALITY SERVICE
                </Typography>
              </Paper>
            </Grid>

            <Grid item key="3" xs={12} sm={6} md={4}>
              <Paper
                className={classes.boxCard}
                elevation={4}
                style={{ backgroundColor: "white" }}
              >
                <img src={wrench} className={classes.icon} />
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  style={{
                    marginTop: "50px",
                    backgroundColor: "white",
                    color: "#212121",
                  }}
                >
                  {" "}
                  AFFORDABLE PRICES
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
};

export default AboutUs;
