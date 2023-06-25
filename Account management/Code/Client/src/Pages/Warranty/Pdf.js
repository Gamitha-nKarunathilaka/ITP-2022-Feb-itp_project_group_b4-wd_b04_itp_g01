import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useReactToPrint } from "react-to-print";
import Pdftemplate from "../../component/Pdftemplate/Pdftemplate";
import PrintIcon from "@mui/icons-material/Print";
const useStyle = makeStyles((theme) => ({
  roots: {
    margin: "20px auto",

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
}));

const Pdf = () => {
  const location = useLocation();
  const obj = location.state.params;
  const navigate = useNavigate();
  const classes = useStyle();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(obj);
  return (
    <div id="review">
      <Container component="main" maxWidth="md" color="red">
        <CssBaseline />

        <Paper className={classes.container}>
          <div ref={componentRef}>
            <Pdftemplate props={obj} />
          </div>
          <Stack
            direction="row"
            spacing={5}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrint}
              endIcon={<PrintIcon />}
              style={{ margin: "10%" }}
            >
              Print
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(-2)}
              style={{ margin: "10%" }}
            >
              Back
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};
export default Pdf;
