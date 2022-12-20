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
  makeStyles,
  TextField,
} from "@material-ui/core";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

import { useFormik } from "formik";
import * as yup from "yup";
import delete_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/delete_icon.svg";
import ExpandMore from "@material-ui/icons/ExpandMore";

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

 const SUPPORTED_FORMATS = ['png','jpg','bmp','tiff','gif']
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
    .required("Password is required")
    .oneOf([yup.ref('newpassword')], 'Passwords does not match'),
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
  avatarimage: yup
  .mixed()
  // .test("FILE_SIZE", "Uploaded file is too big.", 
  // value => !value || (value && value.size <= FILE_SIZE))
  .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
  value => !value || (value && SUPPORTED_FORMATS.includes(value.split('.').pop()))),

  mobile: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("Invalid Number")
    .required("Mobile is required"),
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    height: "80px",
    width: "80px",
  },
  input: {
    display: "none",
  },
}));

const PersonalInformation = () => {
  const classes = useStyles();
  const validFieldsRef = React.useRef();
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


  // const [image, setImage] = React.useState("");
  const [mydata, setData] = React.useState("");
  const onImageChange = (event) => {
    formik.handleChange(event)
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
      mobilecode:"+91",
      mobile: "",
      avatarimage:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    values.mobile=values.mobilecode+values.mobile;
      alert(JSON.stringify(values, null, 2));
    },
  });
const removeImage = () => {
  setData('');
  Object.keys(formik.errors).map(name => {
    if(name === 'avatarimage'){
      formik.values.avatarimage = ''
      delete formik.errors.avatarimage;
    }
    return true;
  });
}
  return (
    <div className="PersonalSection">
      <form onSubmit={formik.handleSubmit} className="formsection">
        <div className="profile-container">
          <div className="form-container">
            <Grid item xs={12}>
              <Typography variant="h7" className="section-heading">
                Personal Information
              </Typography>
              <Divider style={{ marginTop: "8px" }} />
            </Grid>
            <div className="img-section">
              <div className="img-div">
                <Avatar
                id="avatar"
                  alt=""
                  src={mydata.imagePreview}
                  className={classes.large}
                />
              </div>
              <div className="img-btn-div">
                <TextField
                  // accept="image/*"
                  className={classes.input}
                  id="avatarimage"
                  multiple
                  type="file"
                  onChange={onImageChange}
                  inputRef={validFieldsRef}
                  value={formik.values.avatarimage}
                  error={
                    formik.touched.avatarimage &&
                    Boolean(formik.errors.avatarimage)
                  }
                  helperText={
                    formik.touched.avatarimage && formik.errors.avatarimage
                  }
                />
                <label htmlFor="avatarimage">
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
                  //   startIcon={delete_icon}
                  startIcon={<Avatar src={delete_icon} className="deleteIconsvg"/>}
                  onClick={() => removeImage() }
                  >
                  Delete
                </Button>
                {formik.touched.avatarimage && formik.errors.avatarimage ? <p class="MuiFormHelperText-root Mui-error" id="avatarimage-helper-text">{formik.errors.avatarimage}</p> : null}
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
                          width: "280px",
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
                        disabled
                        className="formtextfields text-center"
                        value={formik.values.mobilecode}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.mobilecode && Boolean(formik.errors.mobilecode)
                        }
                        helperText={formik.touched.mobilecode && formik.errors.mobilecode}
                        style={{
                          marginRight: "8px",
                          width: "80px",
                        }}
                        inputProps={
                          {
                            className:"text-center"
                          }
                        }
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                // edge="end"
                              
                              >
                                <ExpandMore/>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        style={{
                          height: "55px",
                          // width:"590px",
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

export default PersonalInformation;