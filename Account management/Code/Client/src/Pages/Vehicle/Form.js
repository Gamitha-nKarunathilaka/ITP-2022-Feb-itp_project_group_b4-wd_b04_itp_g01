import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import Inputprop from "../../component/Inputs/Input";
import Selects from "../../component/Inputs/Select";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import idGenarator from "../../component/IdGenrarator/RandomID";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { db, storage } from "../../init/firebaseinit";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const FuelType = [
  { id: "Petrol", title: "Petrol " },
  { id: "diesel", title: "Diesel" },
];

const Transmission = [
  { id: "Manual", title: "Manual" },
  { id: "Automatic", title: "Automatic" },
  { id: "Semi-automatic", title: "Semi-automatic" },
  { id: "other", title: "Other" },
];
const userStyle = makeStyles((theme) => ({
  submit: {
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
}));

const initialValues = {
  VehicleNo: "",
  Price: "",
  Brand: "",
  YearofManufacture: "",
  Mileage: "",
  FuelType: "",
  Transmission: "",
  EngineCapacity: "",
  Color: "",
  imgUrl: "",
  Model: "",
};

export default function VehicleForm(prop) {
  const { data, setOpenPopUp, setNotify } = prop;
  const [images, setImages] = useState([]);
  const classes = userStyle();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();
  const [profileImg, setprofileImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
  //error handle
  const validate = () => {
    let temp = {};
    temp.Color = values.Color ? "" : "This Field is Required";
    temp.Model = values.Model ? "" : "This Field is Required";
    temp.Price = values.Price ? "" : "This Field is Required";
    temp.Brand = values.Brand ? "" : "This Field is Required";
    temp.YearofManufacture = values.YearofManufacture
      ? ""
      : "This Field is Required";
    temp.Mileage = values.Mileage ? "" : "This Field is Required";
    temp.Transmission = values.Transmission ? "" : "This Field is Required";
    temp.EngineCapacity = values.EngineCapacity ? "" : "This Field is Required";
    temp.FuelType = values.FuelType ? "" : "This Field is Required";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };
  //api call
  const updateClaims = (newData) => {
    const id = data._id;
    console.log(id);
    return publicRequest.put(`Vehicle/update/${id}`, newData);
  };

  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Vehicle/add", claim);
  };

  //useMutation
  //insert
  const add = useMutation(addClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully added",
        type: "success",
      });
      setOpenPopUp(false);
      queryClient.invalidateQueries("Vehicle");
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

  //update
  const updateReq = useMutation(updateClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully Updated",
        type: "success",
      });

      queryClient.invalidateQueries("Vehicle");
      setOpenPopUp(false);
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${error}`,
        type: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (data != null) {
        console.log(values);
        updateReq.mutate({ ...values });
      } else {
        const promises = [];
        console.log("img");
        if (images.length != 0) {
          images.map((image) => {
            const storageRef = ref(storage, `Vehcile/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const prog = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // setProgress(prog);
              },
              (e) =>
                setNotify({
                  isOpen: true,
                  message: `Error Occurd ${e}`,
                  type: "error",
                }),
              () => {
                // setProgress(0);
                console.log("upload");
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log("File available at", downloadURL);
                  createVehicle(downloadURL);
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
        }
      }
    }
  };

  function createVehicle(url) {
    setValues({
      ...values,
      imgUrl: url,
    });
    console.log("after upload");
    console.log(values);
    add.mutate(values);
  }
  useEffect(() => {
    setValues({
      ...values,
      VehicleNo: idGenarator("GMV"),
    });
    console.log("form");
    if (data != null) {
      setValues({
        ["VehicleNo"]: data.VehicleNo,
        ["Price"]: data.Price,
        ["Brand"]: data.Brand,
        ["Mileage"]: data.Mileage,
        ["YearofManufacture"]: data.YearofManufacture,
        ["FuelType"]: data.FuelType,
        ["Transmission"]: data.Transmission,
        ["EngineCapacity"]: data.EngineCapacity,
        ["imgUrl"]: data.imgUrl,
        ["Color"]: data.Color,
        ["Model"]: data.Model,
      });
    }
  }, [data]);
  return (
    <Container component="main">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Inputprop
              name="Color"
              label="Color"
              error={errors.Color}
              value={values.Color}
              onChange={handleChanges}
            />
            <Inputprop
              name="Model"
              label="Model"
              error={errors.Model}
              value={values.Model}
              onChange={handleChanges}
            />
            <Inputprop
              name="Price"
              label="Price"
              type="number"
              error={errors.Price}
              value={values.Price}
              onChange={handleChanges}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Inputprop
              name="Brand"
              label="Brand"
              error={errors.Brand}
              value={values.Brand}
              onChange={handleChanges}
            />
            <Inputprop
              name="YearofManufacture"
              label="Manufacture Year"
              error={errors.YearofManufacture}
              value={values.YearofManufacture}
              onChange={handleChanges}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Inputprop
              name="Mileage"
              type="number"
              label="Mileage"
              error={errors.Mileage}
              value={values.Mileage}
              onChange={handleChanges}
            />
            <Selects
              name="FuelType"
              label="FuelType"
              options={FuelType}
              error={errors.FuelType}
              value={values.FuelType}
              onChange={handleChanges}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Selects
              name="Transmission"
              label="Transmission"
              options={Transmission}
              error={errors.Transmission}
              value={values.Transmission}
              onChange={handleChanges}
            />
            <Inputprop
              name="EngineCapacity"
              label="Engine Capacity"
              error={errors.EngineCapacity}
              value={values.EngineCapacity}
              onChange={handleChanges}
            />
          </Grid>
          {!data && (
            <Grid item xs={12} sm={12}>
              <Stack direction="row" spacing={5}>
                <img
                  src={profileImg}
                  alt="placeholder image"
                  width="200px"
                  height="200px"
                  id="placeholderImage"
                  accept="image/*"
                />
                {/* <CircularProgress variant="determinate" value={progress} /> */}
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
          )}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center">
              <LoadingButton
                //   loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                style={{ margin: "20px" }}
              >
                {!data ? "Submit" : "Update"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
