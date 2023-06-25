const router = require("express").Router();
const User = require("../../models/User/user");
const jwt = require("jsonwebtoken");
const Transporter = require("../../EmailComponent/Email");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const hadnleErrors = (err) => {
  let error = { email: "", password: "" };
  let errors = { email: "", password: "" };
  //login errora

  if (err.message === "User does not exist") {
    error.email = "Email not  Registered";
  }

  if (err.message === "Incorrect password") {
    error.password = "Incorrect Password";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "provided email is already registered";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      error[properties.path] = properties.message;
    });
  }
  return error;
};

//Register
router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      profileImg: req.body.profileImg,
      fullname: req.body.fullname,
      address: req.body.address,
      phoneno: req.body.phoneno,
    });

    res.status(201).json(newUser);
  } catch (err) {
    const errors = hadnleErrors(err);
    res.status(400).json({ errors });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const Reqemail = req.body.email;
    const Reqpassword = req.body.password;
    //call static functuion from userShema model
    const user = await User.login(Reqemail, Reqpassword);

    //create jwt token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    const userDetails = { ...others, accessToken };

    //set cookies
    res.cookie("jwtToken", accessToken);
    //send response with user object and jwt token
    console.log(userDetails);
    res.status(201).json({ userDetails });
  } catch (err) {
    console.log(err);
    const errors = hadnleErrors(err);
    res.status(400).json({ errors });
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const GotUser = await User.findOne({ email });

    if (!GotUser) {
      return res
        .status(400)
        .json({ error: "User with this email doesn't exist" });
    }

    const token = jwt.sign({ id: GotUser._id }, process.env.RESET_SEC, {
      expiresIn: "60m",
    });

    const url = `${process.env.CLIENT_URL}resetpassword/${token}`;

    const mailTemplate = {
      from: process.env.USEREMAIL,
      to: email,
      subject: "PassWord Reset Instructions",
      html: `Please click this Link to reset password: <a href="${url}">Click </a>`,
    };
    GotUser.updateOne({ restlink: token }, (err, success) => {
      if (err) {
        return res.status(500).json(err.message);
      } else {
        Transporter.sendMail(mailTemplate, function (err, info) {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            return res
              .status(200)
              .json({ success: "Further instruction send it to your email" });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/ressetPassword", async (req, res) => {
  const { resetlink, password } = req.body;

  const salt = await bcrypt.genSalt();
  newpassword = await bcrypt.hash(password, salt);

  try {
    if (resetlink) {
      const verified = jwt.verify(resetlink, process.env.RESET_SEC);
      User.findOne({ restlink: resetlink })
        .then((user) => {
          user
            .updateOne({
              $set: { password: newpassword },
            })
            .then(() => {
              return res
                .status(200)
                .json({ message: "Password successfuly changed" });
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ error: "Error occur while reseting password" });
            });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ error: "User with this email doesnt exists" });
        });
    } else {
      return res.status(400).json({ error: "Authentiation Error" });
    }
  } catch (err) {
    if (err.message === "invalid signature" || "jwt expired") {
      return res.status(400).json({ error: "Jwt token invalid or expired" });
    }
    console.log(err.message);
  }
});

router.get("/updatePassword", async (req, res) => {
  res.cookie("jwtToken", "", { maxAge: 1 });
});
module.exports = router;
