import React from "react";
import Slider from "react-slick";
import "./v.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
const s = [
  "https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/Screenshot%20(1296).jpg?alt=media&token=3da38b64-131f-4771-b1e6-1804989d0014",
  "https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/ProfileImg%2FBattlefield-6-cover-art-leaked.jpg?alt=media&token=60e44cff-49cb-40fd-abce-1ae03ce14265",
  "https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/ProfileImg%2F186522275_937493557069872_3553158970485861763_n.jpg?alt=media&token=bbda712e-8c07-4fc3-9250-4abaf717a556",
  "https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/ProfileImg%2Ff10c1448-97aa-11e4-845a-00144feabdc0.jfif?alt=media&token=f3d2e2c9-c002-420a-9dcc-ac47c3e7d678",
];
const settings = {
  customPaging: function (i) {
    return (
      <a>
        <img
          src={s[i]}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            margin: "50px",
          }}
        />
      </a>
    );
  },
  dots: true,
  dotsClass: "slick-dots slick-thumb",
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export default function VehicleDetails() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Stack direction="row">
            <DehazeIcon /> <Typography>Description</Typography>
          </Stack>

          <Typography variant="body1">
            Winner of the auction requires to make an immediate payment of
            Rs.200,000/- to reserve the vehicle.
          </Typography>
          <Button variant="contained" color="primary">
            Bid Now
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Container>
    // <div>
    //   <h2>Custom Paging</h2>
    //   <Slider
    //     {...settings}
    //     style={{ width: "800px", height: "800px", margin: "200px" }}
    //   >
    //     <div>
    //       <img src={s[0]} width="100%" height="100%" />
    //     </div>
    //     <div>
    //       <img src={s[1]} width="100%" height="100%" />
    //     </div>
    //     <div>
    //       <img src={s[2]} width="100%" height="100%" />
    //     </div>
    //     <div>
    //       <img src={s[3]} width="100%" height="100%" />
    //     </div>
    //   </Slider>
    // </div>
  );
}
