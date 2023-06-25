import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  CssBaseline,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import { purple } from "@mui/material/colors";
import { getByDisplayValue } from "@testing-library/react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { Autocomplete } from "@mui/material";
import { db, storage } from "../../init/firebaseinit";
import Notification from "../../component/Notification/Notification";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, LoadingButton } from "@mui/lab";
import placeholderImage from "../../resource/img/plaeholders/placeholder.jpg";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
//   import TextInput from "../component/MultipleInput/TextInput";
import AutoCompleteList from "../../component/Inputs/AutoCompleteList";
import { publicRequest } from "../../axiosRequest/defaultAxios";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "60vh",
    backgroundRepeat: "no-repeat",
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
  paper: {
    padding: "10px",
    [theme.breakpoints.up("sm")]: {
      padding: "40px",
    },
    marginTop: "20px",
  },
  submit: {
    marginTop: "20px",
  },
  grid: {
    marginTop: "20px",
  },
  inputs: {
    display: "none",
  },
  img: {
    display: "flex",
    alignContent: "center",
    textAlign: "center",
  },
  buttons: {
    marginRight: "10px",
  },
  main: {
    [theme.breakpoints.down("md")]: {
      padding: "50px 10px",
    },
  },
  input: {
    "&.MuiInputBase-input": {
      height: "auto",
      padding: "0px",
    },
  },
}));

const WarrentyForm = () => {
  const navigate = useNavigate();

  const form = useRef();
  const classes = userStyle();
  const [options, setoptions] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [pdfloading, setpdfloading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [CodeGroup, setCodeGroup] = useState([]);
  const [BrandGroup, setBrandGroup] = useState([]);

  //input values
  const [adddress, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [user, setUser] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [Brand, setBrand] = useState("");
  const [Code, setCode] = useState("");
  const [curruntdates, setCurruntDate] = useState(formatDate(new Date()));
  const [date, setdate] = useState(new Date());
  const [expireDate, setExpireDate] = useState("");
  const [technician, setTecnician] = useState("");
  const [technicianContactNo, settechnicianContactNo] = useState("");
  const [RegistarationNo, setRegistarationNo] = useState("");
  const [InjectorMake, setInjectorMake] = useState("");
  const [InjectorNo, setInjectorNo] = useState("");
  const [InjectorCode, setInjectorCode] = useState("");
  const [profileImg, setprofileImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [images, setImages] = useState([]);
  //extera infrom textarea
  const [newParts, setNewParts] = useState("");
  const [inputFileds, setInputFilds] = useState([]);

  const [progress, setProgress] = useState(0);
  const [Url, setUrls] = useState("");

  const [WarrantyID, setWarrantyID] = useState("");
  const [errors, setErrors] = useState([]);
  //sendparamters
  const [params, setParams] = useState(null);

  //TODO: testing
  const [cusValue, setCusValue] = useState("");

  function getUnique(arr, comp) {
    // store the comparison  values in array
    const unique = arr
      .map((e) => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  function getUniqueWarrantyID() {
    const date = new Date();
    const year = date.getFullYear();
    const monthe = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const sec = date.getSeconds();
    const uniqueID = "GMW" + year + monthe + day + hour + sec;
    console.log(uniqueID);
    setWarrantyID(uniqueID);
  }
  function formatDate(thedate) {
    return (
      thedate.getFullYear() +
      "/" +
      (thedate.getMonth() + 1) +
      "/" +
      thedate.getDate()
    );
  }
  //hadnle textArea Input exits

  function hadnleTextArea(index, e) {
    const values = [...inputFileds];
    values[index][e.target.name] = e.target.value;
    setInputFilds(values);
    console.log(index, e.target.value, values);
  }

  function onChangeTextArea(event) {
    console.log(event);
    if (event.keyCode === 13) {
      alert("Enter is pressed!");
    } else {
      setNewParts(event.target.value);
    }
  }

  //getCustomer data from firebase
  function getCustomerData() {
    //getdata in real time
    publicRequest
      .get("warrenty/getAll")
      .then((data) => {
        console.log(data.data);
        const uinique = getUnique(data.data.warrenties, "customerName");
        console.log(uinique);
        setCustomer(uinique);
      })
      .catch((err) => console.log(err));
  }

  //getEngineBrand data from firebase
  function getEngineBrand() {
    const collectionRef = collection(db, "Engine");
    //getdata in real time
    onSnapshot(collectionRef, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      console.log(post);
      const unique = getUnique(post, "Brand");
      setBrandGroup(unique);
      setCodeGroup(post);
    });
  }

  //check user is exits or not
  function checkCustomer(name) {
    //firestore query
    console.log(name);
    setUser(name);
    setcustomerName(name);
    const result = customer.filter(
      (customer) => customer.CustomerName === name
    );

    if (result.length === 0) {
      setUser(name);
      console.log("filter");
      return;
    } else {
      console.log("firebase");
      const collectionRef = collection(db, "Warrenty");
      const q = query(
        collectionRef,
        where("CustomerName", "==", result[0].CustomerName)
      );
      //get data for that query
      onSnapshot(q, (snapshot) => {
        let post = [];
        snapshot.docs.map((doc) => {
          post.push({
            key: doc.id,
            ...doc.data(),
          });
        });
        console.log(post);
        post.map((user) => {
          setUser(user.CustomerName);
          setAddress(user.Address);
          setContactNo(user.ContactNo);
        });
      });
    }
  }
  //check Brand is exits or not
  function checkEngine(name) {
    console.log(name);
    //firestore query
    const collectionRef = collection(db, "Engine");
    const q = query(collectionRef, where("Brand", "==", name));

    //get data for that query
    onSnapshot(q, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      console.log(post);
      if (post.length == 0) {
        setBrand(name);

        return;
      } else {
        setCodeGroup(post);
        post.map((user) => {
          setBrand(user.Brand);

          console.log("codeGroupd-:" + user);
        });
      }
    });
  }
  //check BrandCode is exits or not
  function checkEngineCode(name) {
    //firestore query
    const collectionRef = collection(db, "Engine");
    const q = query(collectionRef, where("Code", "==", name));

    //get data for that query
    onSnapshot(q, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
        post.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      console.log(post);
      if (post.length == 0) {
        setCode(name);

        return;
      } else {
        post.map((user) => {
          setCode(name);
          setBrand(user.Brand);
          checkEngine(user.Brand);
        });
      }
    });
  }
  //error handle
  const validate = () => {
    let temp = {};

    temp.Brand = Brand ? "" : "This Field is Required";
    temp.Code = Code ? "" : "This Field is Required";
    temp.adddress = adddress ? "" : "This Field is Required";
    temp.contactNo =
      (/^\d{10}$/.test(contactNo) ? "" : "Enter Valid Phone Number") ||
      (contactNo ? "" : "This Field is Required");
    temp.technician = technician ? "" : "This Field is Required";
    temp.technicianContactNo =
      (/^\d{10}$/.test(technicianContactNo)
        ? ""
        : "Enter Valid Phone Number") ||
      (technicianContactNo ? "" : "This Field is Required");
    temp.RegistarationNo = RegistarationNo ? "" : "This Field is Required";
    temp.InjectorMake = InjectorMake ? "" : "This Field is Required";
    temp.InjectorNo = InjectorNo ? "" : "This Field is Required";
    temp.InjectorNo = InjectorNo ? "" : "This Field is Required";
    temp.InjectorCode = InjectorCode ? "" : "This Field is Required";
    temp.user = user ? "" : "This Field is Required";
    console.log(temp);
    setErrors({
      ...temp,
    });
    //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x == "");
  };

  //date
  const handleDateChange = (dates) => {
    setCurruntDate(new Date(dates));

    setExpireDate(new Date(dates.setMonth(dates.getMonth() + 3)));
  };

  const handleDateExpireChange = (date) => {
    console.log(date);
    setExpireDate(date);
  };

  //hadnle image
  const ImagePreview = (e) => {
    setImages([]);
    const image = document.getElementById("handleImage");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setprofileImg(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);

    for (let i = 0; i < e.target.files.length; i++) {
      setImages((prevState) => [...prevState, e.target.files[i]]);
    }
  };

  useEffect(() => {
    getUniqueWarrantyID();
    getEngineBrand();
    getCustomerData();

    setExpireDate(formatDate(new Date(date.setMonth(date.getMonth() + 3))));
    console.log(curruntdates);
  }, []);

  //Reset value
  const reset = () => {
    setAddress("");
    setContactNo("");
    setUser("");
    setBrand("");
    setCode("");

    setTecnician("");
    settechnicianContactNo("");
    setRegistarationNo("");
    setInjectorMake("");
    setInjectorNo("");
    setInjectorCode("");

    setNewParts("");

    setImages([]);
  };

  //hadnle submit

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setUrls("");

    if (validate()) {
      const promises = [];
      console.log("img");
      if (images.length != 0) {
        images.map((image) => {
          const storageRef = ref(storage, `Productimages/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
          promises.push(uploadTask);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(prog);
            },
            (e) =>
              setNotify({
                isOpen: true,
                message: `Error Occurd ${e}`,
                type: "error",
              }),
            () => {
              setProgress(0);
              console.log("upload");
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                setUrls(downloadURL.toString());

                publicRequest
                  .post("warrenty/addwarrenty", {
                    warrentyNo: WarrantyID,
                    customerName: customerName,
                    adddress: adddress,
                    contactNo: contactNo,
                    dateOfRepair: curruntdates,
                    warrantyTill: expireDate,
                    technician: technician,
                    technicianContactNo: technicianContactNo,
                    vehicalBrand: Brand,
                    vehicalRegistrationNo: RegistarationNo,
                    engineCode: Code,
                    injectorMake: InjectorMake,
                    injectorNo: InjectorNo,
                    injectorCode: InjectorCode,
                    extraDetails: newParts,
                    img: downloadURL,
                  })
                  .then((result) => {
                    console.log("resukt after submit");
                    console.log(result.data);
                    setParams(result.data);
                    setLoading(false);
                    setNotify({
                      isOpen: true,
                      message: "Successfully inserted",
                      type: "success",
                    });
                    setpdfloading(true);
                  })
                  .catch((e) => {
                    setLoading(false);
                    setNotify({
                      isOpen: true,
                      message: `Error Occurd ${e}`,
                      type: "error",
                    });
                  });
              });
            }
          );
        });
      } else {
        setNotify({
          isOpen: true,
          message: `Please Upload A Image`,
          type: "error",
        });
        setLoading(false);
      }
    } //if
    else {
      setLoading(false);
    }
  };

  const autocomplete = (e, newValue) => {
    // Create a new value from the user input
    setCusValue(newValue);
    console.log(newValue);
  };
  const getOptionLabel = (option) => {
    return option.CustomerName;
  };

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" color="primary">
            Warrenty
          </Typography>
          <Paper className={classes.paper}>
            <form
              ref={form}
              className={classes.form}
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="none"
              id="submitForm"
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} className={classes.grid}>
                  {/*Customer Name*/}
                  <Autocomplete
                    inputValue={user}
                    onInputChange={(event, newInputValue) => {
                      checkCustomer(newInputValue);
                    }}
                    id="controllable"
                    freeSolo
                    loading={true}
                    limitTags={2}
                    options={customer}
                    getOptionLabel={(option) => {
                      return option.customerName;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer Name"
                        variant="outlined"
                        error={errors.user ? true : false}
                        helperText={errors.user}
                      />
                    )}
                  />
                  {/*Address*/}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="address"
                    className={classes.input}
                    label="Address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={adddress}
                    error={errors.adddress ? true : false}
                    helperText={errors.adddress}
                  />
                  {/*ContactNo*/}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    error={errors.contactNo ? true : false}
                    helperText={errors.contactNo}
                    fullWidth
                    style={{ padding: "0px", height: "auto" }}
                    id="ContactNo"
                    label="Contact No"
                    name="ContactNo"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                  {/*Engine Brand*/}
                  <Autocomplete
                    inputValue={Brand}
                    onInputChange={(event, newInputValue) => {
                      checkEngine(newInputValue);
                    }}
                    id="controllable"
                    options={BrandGroup}
                    getOptionLabel={(option) => option.Brand}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehical Brand"
                        variant="outlined"
                        error={errors.Brand ? true : false}
                        helperText={errors.Brand}
                      />
                    )}
                  />
                  {/*Registration No*/}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    error={errors.RegistarationNo ? true : false}
                    helperText={errors.RegistarationNo}
                    fullWidth
                    id="RegistrationNo"
                    label="Registration No"
                    name="RegistrationNo"
                    value={RegistarationNo}
                    onChange={(e) => setRegistarationNo(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Date of Repair"
                    renderInput={(params) => (
                      <TextField fullWidth margin="normal" {...params} />
                    )}
                    value={curruntdates}
                    onChange={handleDateChange}
                  />

                  <DatePicker
                    label="Date of Expire"
                    renderInput={(params) => (
                      <TextField fullWidth margin="normal" {...params} />
                    )}
                    value={expireDate}
                    onChange={handleDateExpireChange}
                  />
                  {/*Date of Repair*/}

                  {/*Warranty till */}

                  {/*Technician */}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    error={errors.technician ? true : false}
                    helperText={errors.technician}
                    fullWidth
                    id="Technician"
                    label="Technician"
                    name="Technician"
                    value={technician}
                    onChange={(e) => setTecnician(e.target.value)}
                  />

                  {/*Technician Contact No */}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    error={errors.technicianContactNo ? true : false}
                    helperText={errors.technicianContactNo}
                    fullWidth
                    id="Technician Contact No"
                    label="Technician ContactNo"
                    name="Technician Contact No"
                    value={technicianContactNo}
                    onChange={(e) => settechnicianContactNo(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={8}
                  className={classes.grid}
                  style={{ border: "2px solid", borderColor: "#fafafa" }}
                >
                  {/*Engine Code */}
                  <Autocomplete
                    inputValue={Code}
                    onInputChange={(event, newInputValue) => {
                      checkEngineCode(newInputValue);
                    }}
                    id="controllable"
                    options={CodeGroup}
                    getOptionLabel={(option) => option.Code}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Engine Code"
                        variant="outlined"
                        error={errors.Code ? true : false}
                        helperText={errors.Code}
                      />
                    )}
                  />

                  {/*InjectorMake */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    error={errors.InjectorMake ? true : false}
                    helperText={errors.InjectorMake}
                    fullWidth
                    id="InjectorMake"
                    label="Injector Make"
                    name="InjectorMake"
                    value={InjectorMake}
                    onChange={(e) => setInjectorMake(e.target.value)}
                  />

                  {/*InjectorNo */}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    error={errors.InjectorNo ? true : false}
                    helperText={errors.InjectorNo}
                    fullWidth
                    id="InjectorNo"
                    label="Injector No"
                    name="InjectorNo"
                    value={InjectorNo}
                    onChange={(e) => setInjectorNo(e.target.value)}
                  />
                  {/*InjectorCode*/}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    error={errors.InjectorCode ? true : false}
                    helperText={errors.InjectorCode}
                    fullWidth
                    id="InjectorCode"
                    label="Injector Code"
                    name="InjectorCode"
                    value={InjectorCode}
                    onChange={(e) => setInjectorCode(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={8} className={classes.grid}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="NewPartsDetails"
                    label="New Parts Details"
                    name="New Parts Details"
                    className={classes.textarea}
                    value={newParts}
                    multiline
                    minRows="10"
                    onChange={(event) => onChangeTextArea(event)}
                  />
                  {/* 
                  <TextInput
                    inputfileds={inputFileds}
                    onChange={hadnleTextArea}
                    setInputFilds={setInputFilds}
                  /> */}
                </Grid>
                <Grid item xs={12} sm={4} className={classes.grid}></Grid>
                <Grid item xs={12} sm={4} className={classes.grid}>
                  <Stack direction="row" spacing={5}>
                    <img
                      src={profileImg}
                      alt="placeholder image"
                      width="200px"
                      height="200px"
                      id="placeholderImage"
                      accept="image/*"
                    />
                    <CircularProgress variant="determinate" value={progress} />
                    <input
                      accept="image/*"
                      className={classes.inputs}
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => ImagePreview(e)}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<PhotoCamera />}
                        style={{ marginTop: "75%" }}
                      >
                        Upload
                      </Button>
                    </label>
                  </Stack>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} className={classes.grid}>
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  type="submit"
                  style={{ margin: "20px" }}
                >
                  Submit
                </LoadingButton>

                {pdfloading && (
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<PictureAsPdfIcon />}
                    onClick={() => {
                      navigate("/warrenty/form/pdf", {
                        state: {
                          params,
                        },
                      });
                    }}
                  >
                    Genrate Pdf
                  </Button>
                )}
              </Grid>
            </form>
            <Notification notify={notify} setNotify={setNotify} />
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default WarrentyForm;
