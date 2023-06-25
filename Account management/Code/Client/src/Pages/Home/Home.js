import makeStyles from "@mui/styles/makeStyles";

import Header from "../../component/Menu/Header";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import Landing from "./Landing";
import OurService from "./OurService";
import Reviews from "./Reviews";

const userStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  divider: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Home = (props) => {
  const classes = userStyle();

  return (
    <>
      <Header />
      <Landing />
      <OurService />
      <AboutUs />
      <Reviews />
      <Footer />
    </>
  );
};
//using props
export default Home;
