import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_POINT}/user/create-user`,
          values
        );
        setAlertType("success");
        setAlertMessage(response.data.message);
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({ email: error.response.data.message });
          setAlertType("error");
          setAlertMessage(error.response.data.message);
        } else {
          setAlertType("error");
          setAlertMessage("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleLogin = () => {
    navigate("/");
  };
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/loginbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        opacity: 1,
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />{" "}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
        }}
      >
        <Typography component="h1" variant="h5" color="black">
          Sign Up
        </Typography>
        {alertMessage && (
          <Alert severity={alertType} sx={{ width: "100%", mb: 2 }}>
            {alertMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                fullWidth
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                fullWidth
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                fullWidth
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                fullWidth
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </Box>
        <Typography>
          already have an account?{" "}
          <Button sx={{ color: "violet" }} onClick={handleLogin}>
            Login
          </Button>
        </Typography>
      </Box>
    </Grid>
  );
};

export default Signup;
