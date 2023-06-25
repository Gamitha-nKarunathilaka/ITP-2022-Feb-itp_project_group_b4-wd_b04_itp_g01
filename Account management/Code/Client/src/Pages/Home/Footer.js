import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Map from "../../component/Map/Map";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "50vh",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
    maxWidth: "100%",
    backgroundColor: "#212121",
    color: "white",
  },
  container: {
    width: "100%",
    minHeight: "25vh",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: "primary",
  },
}));

const FooterPage = () => {
  const classes = userStyle();
  return (
    <>
      <footer className={classes.roots}>
        <Box className={classes.container} color="white" pt={{ xs: 8, sm: 10 }}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box borderBottom={1} pb={{ xs: 1, sm: 2 }}>
                  <Typography> About</Typography>
                </Box>
                <Box pt={{ xs: 2, sm: 3 }}>
                  <Typography variant="body2" component="p" align="justify">
                    {" "}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box borderBottom={1} pb={{ xs: 1, sm: 2 }} marginBottom={2}>
                  <Typography>Location</Typography>
                </Box>
                <Map />
              </Grid>

              {/* Scocial media*/}
              <Grid item xs={12} sm={4}>
                <Box borderBottom={1} pb={{ xs: 1, sm: 2 }}>
                  <Typography>Social Media </Typography>
                </Box>
                <Box pt={{ xs: 2, sm: 3 }}>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton
                      color="secondary"
                      aria-label="add an alarm"
                      size="medium"
                    >
                      <Facebook color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton color="secondary" aria-label="add an alarm">
                      <LinkedIn color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton color="secondary" aria-label="add an alarm">
                      <Instagram color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://fonts.google.com/specimen/Exo?query=exo"
                    target="_blank"
                  >
                    <IconButton color="secondary" aria-label="add an alarm">
                      <Twitter color="primary" className={classes.large} />
                    </IconButton>
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Box
              textAlign="center"
              pt={{ xs: 5, sm: 10 }}
              pb={{ xs: 5, sm: 4 }}
            >
              Logo &reg; {new Date().getFullYear()}
            </Box>
          </Container>
        </Box>
      </footer>
    </>
  );
};

export default FooterPage;
