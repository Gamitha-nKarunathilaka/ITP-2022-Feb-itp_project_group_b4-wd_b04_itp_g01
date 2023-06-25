import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Pagination from "@mui/material/Pagination";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Header from "../../component/Menu/ClientMenu";
import { Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Notification from "../../component/Notification/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import VehicleTable from "../../component/Table/VehicleTable";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { motion } from "framer-motion";
const useStyle = makeStyles((theme) => ({
  roots: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  main: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(7),
      height: "auto",
    },
    height: "50vh",
    padding: "0",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  titleBOx: {
    marginTop: "5%",
  },
  cards: {
    marginTop: "1%",
  },
  media: {
    height: "180px",
  },
  search: {
    width: "50%",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  cardActionBtn: {
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  },
}));

async function fetchPlanets(page) {
  console.log(page);
  const res = await publicRequest.get(`vehicle/sale/?page=${page}&limit=12`);
  return res;
}
export default function Store() {
  const classes = useStyle();
  const [vehicles, setVehicls] = useState([]);
  const [isDataEmpty, setisDataEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const [NoOfPages, setNoOfPages] = useState(1);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //React Query

  const { status, isSuccess, isLoading, data, isError, error, refetch } =
    useQuery(["Vehicles", page], () => fetchPlanets(page), {
      refetchOnWindowFocus: false,
      // turned off by default, manual refetch is needed
    });

  //search
  const [searchFilter, setSearchFilter] = useState({
    fn: (items) => {
      return items;
    },
  });
  //pagination
  const handlePageChange = (value) => {
    setPage(value - 1);
    // queryClient.invalidateQueries("Vehicles");
  };

  const handleSearch = (e) => {
    let target = e.target;

    setSearchFilter({
      fn: (items) => {
        if (target.value == "") {
          setVehicls(items);
          console.log("items");
        }
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.Brand.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
    setVehicls(searchFilter.fn(vehicles));
  };

  const handlepages = (values) => {
    const count = Math.ceil(values / 12.0);
    console.log(count);
    setNoOfPages(count);
  };

  useEffect(() => {
    // getData();
    // refetch();
    if (isSuccess) {
      const payload = data.data.vehicle;
      const count = data.data.count;
      const length = payload.length;
      if (length != 0) {
        setVehicls(payload);
        handlepages(count);

        setisDataEmpty(false);
        console.log(payload);
      } else {
        console.log("Data empty");

        setisDataEmpty(true);
      }
    }

    if (isError) {
      // setLoading(true);
      console.log(error);
      setNotify({
        isOpen: true,
        message: `Error Occurd ${error}`,
        type: "error",
      });
    }
  }, [data, error, isDataEmpty]);
  return (
    <>
      <Header />

      <div className={classes.roots}>
        {/* <div className={classes.main}>
          <img src={banner} width="100%" height="100%" />
        </div> */}

        <Box className={classes.titleBOx}>
          <Container
            component="main"
            maxWidth="md"
            className={classes.title}
          ></Container>
        </Box>
        <Box className={classes.cards}>
          <Container component="main" maxWidth="lg">
            <motion.div layout>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Toolbar>
                    <TextField
                      size="small"
                      className={classes.search}
                      color="secondary"
                      label="Search field"
                      variant="outlined"
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Toolbar>
                </Grid>
                {isLoading &&
                  [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                    return (
                      <Grid item key={item} xs={12} sm={6} md={4}>
                        <div
                          style={{
                            marginBottom: "20px",
                            padding: "20px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            width={280}
                            height={118}
                          />
                          <Skeleton width="60%" />
                          <Skeleton width="60%" />
                        </div>
                      </Grid>
                    );
                  })}

                {!isLoading &&
                  !isDataEmpty &&
                  vehicles.map((item) => {
                    return (
                      <Grid item key={item._id} xs={12} sm={6} md={4}>
                        <motion.div layout>
                          <Card>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                className={classes.media}
                                image={item.imgUrl[0]}
                                title={item.Model}
                              />

                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  {item.Brand} {item.Model}
                                </Typography>
                                <VehicleTable items={item} />
                              </CardContent>
                            </CardActionArea>
                            <CardActions style={{ justifyContent: "center" }}>
                              <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                className={classes.cardActionBtn}
                              >
                                See More
                              </Button>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Grid>
                    );
                  })}

                {isDataEmpty && (
                  <Box alignItems="center">
                    <Typography color="error" component="h1">
                      No Data Available
                    </Typography>
                  </Box>
                )}
              </Grid>
            </motion.div>
          </Container>
        </Box>
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0",
            height: "10vh",
          }}
        >
          <Pagination
            count={NoOfPages}
            color="primary"
            defaultPage={1}
            showFirstButton={true}
            showLastButton={true}
            onChange={(event, value) => handlePageChange(value)}
          />
          <Notification notify={notify} setNotify={setNotify} />
        </Container>
      </div>
      {/* <Footer /> */}
    </>
  );
}
