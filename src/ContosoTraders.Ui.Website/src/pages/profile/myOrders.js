import React from "react";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Divider,
  Avatar,
  FormLabel,
  InputAdornment,
  FormControl,
  TextField,
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";
import * as yup from "yup";


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  newpassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  currentpassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmpassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  firstName: yup
    .string("Enter your first Name")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  dob: yup
    .string("Enter your date of birth")
    .required("Date of Birth is required"),
  mobile: yup
    .number("Enter your mobile number")
    .positive("Invalid Number")
    .required("Mobile is required"),
});


const MyOrders = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });


  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const [mydata, setData] = React.useState("");
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        setData({
          ...mydata,
          imagePreview: reader.result,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      newpassword: "",
      currentpassword: "",
      confirmpassword: "",
      dob: "",
      mobile: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="PersonalSection">
      <form onSubmit={formik.handleSubmit} className="formsection">
        <div className="profile-container">
          <div className="form-container">
            <Grid item xs={12}>
              <Typography variant="h7" className="section-heading">
                My Address Book
              </Typography>
              <Divider style={{ marginTop: "8px" }} />
            </Grid>
            <div className="img-section">
              <div className="img-div">
                <Avatar
                  alt="Remy Sharp"
                  src={mydata.imagePreview}
                />
              </div>
              <div className="img-btn-div">
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onImageChange}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    className="btn-upload"
                    color="primary"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>

                <Button
                  className="btn-delete"
                  variant="outlined"
                  startIcon={<DeleteOutline />}
                  onClick={() => setData("")}
                >
                  Delete
                </Button>
              </div>
            </div>
            <Grid item xs={6} container>
              <div className="field-container">
                <FormControl>
                  <Grid container>
                    <Grid item xs={5}>
                      <FormLabel htmlFor="first-name" className="form-labels">
                        First Name
                      </FormLabel>
                      <TextField
                        id="firstName"
                        className="formtextfields"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                        style={{
                          margin: "7px 0px 16px 0px",
                          width: "286px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                      <FormLabel htmlFor="last-name" className="form-labels">
                        Last Name
                      </FormLabel>
                      <TextField
                        id="lastName"
                        className="formtextfields"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                        style={{
                          margin: "7px 0px 16px 0px",
                          width: "286px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                  <Grid container className="email-container">
                    <Grid item xs={12}>
                      <FormLabel htmlFor="email" className="form-labels">
                        Email
                      </FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        className="formtextfields"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className="mobile-container">
                    <Grid item xs={12}>
                      <FormLabel htmlFor="mobile" className="form-labels">
                        Mobile Number
                      </FormLabel>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="mobilecode"
                        className="formtextfields"
                        style={{
                          marginRight: "8px",
                          width: "80px",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="mobile"
                        className="formtextfields"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.mobile && Boolean(formik.errors.mobile)
                        }
                        helperText={
                          formik.touched.mobile && formik.errors.mobile
                        }
                        style={{
                          width: "502px",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className="dob-container">
                    <Grid item xs={5}>
                      <FormLabel htmlFor="dob" className="form-labels">
                        Date of birth
                      </FormLabel>
                    </Grid>
                    <Grid item xs={7} />
                    <Grid item xs={12}>
                      <TextField
                        id="dob"
                        type="date"
                        inputFormat="DD/MM/YYYY"
                        className="formtextfields"
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                        helperText={formik.touched.dob && formik.errors.dob}
                        endAdornment={
                          <InputAdornment position="end">
                            <ExpandMoreIcon />
                          </InputAdornment>
                        }
                        style={{
                          height: "55px",
                        }}
                      ></TextField>
                    </Grid>
                  </Grid>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={12} className="passworddiv">
              <Typography variant="h7" className="section-heading">
                Change Password
              </Typography>
              <Divider style={{ marginTop: "8px", marginBottom: "30px" }} />
            </Grid>
            <Grid item xs={6}>
              <div className="passwd-section">
                <Grid container className="currentpassword-container">
                  <Grid item xs={5}>
                    <FormLabel
                      htmlFor="current-password"
                      className="form-labels"
                    >
                      Current Password
                    </FormLabel>
                  </Grid>
                  <Grid item xs={7} />
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      id="currentpassword"
                      value={formik.values.currentpassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.currentpassword &&
                        Boolean(formik.errors.currentpassword)
                      }
                      helperText={
                        formik.touched.currentpassword &&
                        formik.errors.currentpassword
                      }
                      className="formtextfields"
                    />
                  </Grid>
                </Grid>

                <Grid container className="newpassword-container">
                  <Grid item xs={5}>
                    <FormLabel htmlFor="new-password" className="form-labels">
                      New Password
                    </FormLabel>
                  </Grid>
                  <Grid item xs={7} />
                  <Grid item xs={12}>
                    <TextField
                      type={values.showPassword ? "text" : "password"}
                      id="newpassword"
                      className="formtextfields newpassfield"
                      value={formik.values.newpassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.newpassword &&
                        Boolean(formik.errors.newpassword)
                      }
                      helperText={
                        formik.touched.newpassword && formik.errors.newpassword
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container className="confirmpassword-container">
                  <Grid item xs={5}>
                    <FormLabel
                      htmlFor="confirm-password"
                      style={{ color: "#000" }}
                    >
                      Confirm Password
                    </FormLabel>
                  </Grid>
                  <Grid item xs={7} />
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      id="confirmpassword"
                      value={formik.values.confirmpassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmpassword &&
                        Boolean(formik.errors.confirmpassword)
                      }
                      helperText={
                        formik.touched.confirmpassword &&
                        formik.errors.confirmpassword
                      }
                      className="formtextfields"
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={6}></Grid>

            <Grid item xs={12}>
              <div className="submit-div">
                <Button
                  variant="contained"
                  color="primary"
                  className="btn-submit"
                  type="Submit"
                >
                  Save Changes
                </Button>
              </div>
            </Grid>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyOrders;