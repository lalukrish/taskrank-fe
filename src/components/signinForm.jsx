import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SigninForm = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_POINT}/user/user-login`,
          values
        );
        setAlertType("success");
        setAlertMessage(response.data.message);
        localStorage.setItem("USER_ID", response.data.user.id);
        localStorage.setItem("EMAIL_ID", response.data.user.email);
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAlertType("error");
          setAlertMessage("Invalid credentials");
        } else {
          setAlertType("error");
          setAlertMessage("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSignup = () => {
    navigate("/signup");
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
      />
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
          Sign In
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Sign In
          </Button>
        </Box>
        <Typography color="white">
          Don't have an account?{" "}
          <Button sx={{ color: "violet" }} onClick={handleSignup}>
            Signup
          </Button>
        </Typography>
      </Box>
    </Grid>
  );
};

export default SigninForm;
